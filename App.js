import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAllEnergyData, getGreetingOneTest } from './api/energyService';
import { useEffect, useState } from 'react';

export default function App() {
  // loading is null
  const [data, setData] = useState('loading...');

  useEffect(() => {
    // define + call inside the effect
    async function load() {
      try{
        const result = await getAllEnergyData();
        setData(result);
      } catch (err) {
        console.error('fetch for energy test failed!')
      }
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      {/* this data is the greeting test to confirm that the connection */}
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
