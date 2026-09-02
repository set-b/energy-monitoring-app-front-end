import { StyleSheet, Text, View, Button } from 'react-native';

export default function SettingsPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings Page</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});