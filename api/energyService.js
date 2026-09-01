import client from './client';

// GET readings
export async function getReadings() {
  const response = await client.get('/readings');
  return response.data;
}

// GET one reading by id
export async function getReading(id) {
  const response = await client.get(`/readings/${id}`);
  return response.data;
}

// POST a new reading
export async function createReading(reading) {
  // reading = { timestamp, value, unit } etc.
  const response = await client.post('/readings', reading);
  return response.data;
}

// GET greeting test
export async function getGreetingOneTest() {
    const response = await client.get('/greetings/1')
    console.log(response)
    return response.data
}

export async function getAllEnergyData() {
  const response = await client.get('/energy_data')
  console.log(response)
  return response.data
}