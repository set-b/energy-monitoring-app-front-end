import { xml2js } from 'xml-js';

const API_KEY = 'eyJvcmciOiI1ZTU1NGUxOTI3NGE5NjAwMDEyYTNlYjEiLCJpZCI6IjFmOGMyMmU0NDFlMTRkYmViOGZlZWM3MmQwNGEyMGM0IiwiaCI6Im11cm11cjEyOCJ9';
const BASE = 'https://api.dataplatform.knmi.nl/open-data/v1/datasets/uv_index/versions/1.0/files';

async function getLatestXmlFilename() {
  const res = await fetch(`${BASE}?sorting=desc&orderBy=lastModified&maxKeys=20`, {
    headers: { Authorization: API_KEY },
  });
  const json = await res.json();
  // filter for the xml file, not txt
  const xmlFile = json.files.find(f => f.filename.endsWith('.xml'));
  return xmlFile.filename;
}

async function getDownloadUrl(filename) {
  const res = await fetch(`${BASE}/${filename}/url`, {
    headers: { Authorization: API_KEY },
  });
  const json = await res.json();
  return json.temporaryDownloadUrl;
}

function uvLabel(value) {
  if (value < 3) return 'Low';
  if (value < 6) return 'Moderate';
  if (value < 8) return 'High';
  if (value < 11) return 'Very High';
  return 'Extreme';
}

export async function getUvIndex() {
  const filename = await getLatestXmlFilename();
  const downloadUrl = await getDownloadUrl(filename);

  const fileRes = await fetch(downloadUrl);
  const xmlText = await fileRes.text();

  const result = xml2js(xmlText, { compact: true });

  const blocks = result.report.data.location.block;
  const today = blocks.find(
    (b) => b.field_id._text === 'zonkracht_zonnig' && b.valid_id._text === 'dag00'
  );

  const value = parseFloat(today.field_content._text);

  return {
    uvIndex: value,
    uvLabel: uvLabel(value),
  };
}