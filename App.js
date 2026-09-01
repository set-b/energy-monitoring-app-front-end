import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getGreetingOneTest } from './api/energyService';
import { useEffect, useState } from 'react';

export default function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    // define + call inside the effect
    async function load() {
      try{
        const result = await getGreetingOneTest();
        setData(result);
      } catch (err) {
        console.error('fetch for greeting test failed!')
      }
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      {/* this data is the greeting test to confirm that the connection */}
      <Text>{ JSON.stringify(data.text) }</Text>
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
