import { StyleSheet, Text, View, Button } from 'react-native';
import { sendApplianceNotification, sendCarportNotification } from '../services/notificationService';


export default function SettingsPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings Page</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Simulate Appliance Notification" onPress={() => sendApplianceNotification(2)}/>
      <Button title="Simulate Carport Notification" onPress={() => sendCarportNotification(2)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});