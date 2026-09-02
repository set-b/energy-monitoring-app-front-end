import axios from 'axios';
import { Platform } from 'react-native';

// Spring Boot default port is 8080.
// IMPORTANT: "localhost" from a phone/emulator does NOT mean your computer.
// - Web browser (expo start --web): localhost works
// - Android emulator: use 10.0.2.2
// - iOS simulator: localhost works
// - Real device: use your computer's LAN IP, e.g. 192.168.1.42
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8080/';
  }
  return 'http://localhost:8080/'; // REPLACE WITH LAPTOP IPV4 ADDRESS WHEN SHOWING
};

const client = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Optional: attach an auth token to every request later
client.interceptors.request.use((config) => {
  // const token = ...getToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;