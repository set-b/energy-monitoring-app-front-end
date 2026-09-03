import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUvIndex } from '../services/knmiService';
import { getSunriseSunset } from '../services/sunriseService';

// temporary Cloudflare tunnel for the backend
const BASE_URL = 'https://personality-neighborhood-seattle-finest.trycloudflare.com';

// mock values used whenever the real backend call fails
const MOCK = {
  carportHours: 2,
  gridDelta: 3.4, 
  energySaved: 113,
  moneySaved: 46,
};

// fetches a JSON endpoint, falling back to a mock value if anything goes wrong
async function fetchWithFallback(path, fallbackValue, parse = (json) => json) {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const json = await res.json();
    return parse(json);
  } catch (err) {
    console.warn(`fetch for ${path} failed, using mock data:`, err.message);
    return fallbackValue;
  }
}

// converts the energy delta (production - consumption) into a status string
function gridStatusFromDelta(delta) {
  if (delta > 2) return 'surplus';
  if (delta < -2) return 'deficit';
  return 'balanced';
}

// carportHours: 0 = "now", up to 4 = soon, more than 4 = later
function getCarportColor(hours) {
  if (hours <= 0) return '#CFE9CF'; 
  if (hours <= 4) return '#F5D9C3'; 
  return '#F5D3D3'; 
}

function getCarportLabel(hours) {
  if (hours <= 0) return 'Now';
  if (hours === 1) return 'In 1 hour';
  return `In ${hours} hours`;
}

// gridStatus: 'surplus' | 'balanced' | 'deficit'
function getGridColor(status) {
  switch (status) {
    case 'surplus':
      return '#CFE9CF'; 
    case 'balanced':
      return '#F5D9C3'; 
    case 'deficit':
      return '#F5D3D3'; 
    default:
      return '#eee';
  }
}

function getGridLabel(status) {
  switch (status) {
    case 'surplus':
      return 'Surplus';
    case 'balanced':
      return 'Balanced';
    case 'deficit':
      return 'Deficit';
    default:
      return '...';
  }
}


export default function NeighbourhoodPage({ navigation }) {
  const insets = useSafeAreaInsets();

  const [rank, setRank] = useState(null);
  const [moneySaved, setMoneySaved] = useState(null);
  const [energySaved, setEnergySaved] = useState(null);

  // carportHours drives both the color and the display text
  const [carportHours, setCarportHours] = useState(null);
  // gridStatus is one of: 'surplus' | 'balanced' | 'deficit'
  const [gridStatus, setGridStatus] = useState(null);

  const [uvIndex, setUvIndex] = useState(null);
  const [uvLabel, setUvLabel] = useState(null); // e.g. 'Moderate'
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  useEffect(() => {
    async function loadCommunityStats() {
      setRank(3);

      const [carport, delta, energy, money] = await Promise.all([
        fetchWithFallback(
          '/energy_data/today/next-best-time/carport',
          MOCK.carportHours,
          (json) => (typeof json === 'number' ? json : json.hours)
        ),
        fetchWithFallback(
          '/energy_data/neighborhood/subtract/overall',
          MOCK.gridDelta,
          (json) => (typeof json === 'number' ? json : json.value)
        ),
        fetchWithFallback(
          '/energy_data/savings/energy',
          MOCK.energySaved,
          (json) => (typeof json === 'number' ? json : json.value)
        ),
        fetchWithFallback(
          '/energy_data/savings/money',
          MOCK.moneySaved,
          (json) => (typeof json === 'number' ? json : json.value)
        ),
      ]);

      setCarportHours(carport);
      setGridStatus(gridStatusFromDelta(delta));
      setEnergySaved(energy);
      setMoneySaved(money);
    }

    async function loadSunlightForecast() {
      try {
        const uv = await getUvIndex();
        setUvIndex(uv.uvIndex);
        setUvLabel(uv.uvLabel);

        const sun = await getSunriseSunset(52.2661, 6.1552); // deventer lat/lon
        setSunrise(sun.sunrise);
        setSunset(sun.sunset);
      } catch (err) {
        console.error('fetch for sunlight forecast failed!', err);
      }
    }

    loadCommunityStats();
    loadSunlightForecast();
  }, []);

  const carportColor = carportHours !== null ? getCarportColor(carportHours) : '#eee';
  const carportLabel = carportHours !== null ? getCarportLabel(carportHours) : '...';

  const gridColor = gridStatus !== null ? getGridColor(gridStatus) : '#eee';
  const gridLabel = getGridLabel(gridStatus);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 120 },
      ]}
    >
      <Text style={styles.rankText}>
        Your home ranks <Text style={styles.bold}>{rank ?? '...'}rd</Text> in the
        leadership board this month
      </Text>

      <Text style={styles.subText}>
        As community, the amount of Money/Energy saved is:
      </Text>

      <View style={[styles.statCard, styles.shadow]}>
        <Text style={styles.icon}>👥</Text>
        <Text style={styles.statAmount}>
          €{moneySaved !== null ? moneySaved.toFixed(2) : '...'}
        </Text>        
        <Text style={styles.statSub}>{energySaved ?? '...'}kwh</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.infoCard, styles.shadow, { backgroundColor: carportColor }]}>
          <Image source={require('../assets/caricon.png')} style={styles.icon} />
          <Text style={styles.infoCardBold}>{carportLabel}</Text>
          <Text style={styles.infoCardSub}>Is the best time to use the carport</Text>
        </View>

        <View style={[styles.infoCard, styles.shadow, { backgroundColor: gridColor }]}>
          <Image source={require('../assets/happy-face.png')} style={styles.icon} />
          <Text style={styles.infoCardSub}>Currently we are at a:</Text>
          <Text style={styles.infoCardBold}>{gridLabel}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Sunlight Forecast</Text>

      <View style={styles.row}>
        <View style={[styles.forecastCard, styles.shadow, styles.uvCard]}>
          <Image source={require('../assets/uv-icon.png')} style={styles.icon} />
          <Text style={styles.forecastValue}>{uvIndex ?? '...'}</Text>
          <Text style={styles.forecastSub}>{uvLabel ?? '...'}</Text>
        </View>

        <View style={[styles.forecastCard, styles.shadow, styles.sunCard]}>
          <Image source={require('../assets/sunrise-icon.png')} style={styles.icon} />
          <Text style={styles.forecastValue}>{sunrise ?? '...'}</Text>
          <Text style={styles.forecastSub}>Sunset: {sunset ?? '...'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  rankText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  bold: {
    fontWeight: '700',
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  statAmount: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  statSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 4,
    alignItems: 'flex-start',
  },
  infoCardBold: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 6,
  },
  infoCardSub: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  forecastCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 4,
  },
  uvCard: {
    backgroundColor: '#3E7D4A',
  },
  sunCard: {
    backgroundColor: '#2F6B47',
  },
  forecastLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 6,
  },
  forecastValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  forecastSub: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});