import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './screens/homepage';
import NeighbourhoodPage from './screens/neighbourhoodpage';
import SettingsPage from './screens/settingspage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="Neighbourhood" component={NeighbourhoodPage} options={{ title: 'Neighbourhood' }} />
        <Stack.Screen name="Settings" component={SettingsPage} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}