import { NavigationContainer } from "@react-navigation/native";

import HomePage from "./screens/homepage";
import NeighbourhoodPage from "./screens/neighbourhoodpage";
import SettingsPage from "./screens/settingspage";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

// native tabs doesnt seem to work on mobile either
const Tab = false //Platform.OS !== 'web' ?
	? createNativeBottomTabNavigator()
	: createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{ headerShown: false }}
			>
				<Tab.Screen name="Home" component={HomePage} />
				<Tab.Screen
					name="Neighbourhood"
					component={NeighbourhoodPage}
					options={{ title: "Neighbourhood" }}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsPage}
					options={{ title: "Settings" }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
