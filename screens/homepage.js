import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { getAllEnergyData } from '../api/energyService';
import { useEffect, useState } from 'react';

export default function HomePage({ navigation }) {
  const [data, setData] = useState('loading...');

  useEffect(() => {
    async function load() {
      try {
        const result = await getAllEnergyData();
        setData(result);
      } catch (err) {
        console.error('fetch for energy test failed!');
      }
    }
    load();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{JSON.stringify(data)}</Text>

      <Button title="Go to Neighbourhood" onPress={() => navigation.navigate('Neighbourhood')} />
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});