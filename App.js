import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import HomePage from "./screens/homepage";
import NeighbourhoodPage from "./screens/neighbourhoodpage";
import SettingsPage from "./screens/settingspage";

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#000";
const INACTIVE_COLOR = "#8E8E93";
const PILL_COLOR = "#EDE9F7";

function TabIcon({ focused, source }) {
	return (
		<View style={styles.iconWrapper}>
			<View style={[styles.pill, focused && styles.pillActive]}>
				<Image
					source={source}
					style={[
						styles.iconImage,
						{ tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
					]}
					resizeMode="contain"
				/>
			</View>
		</View>
	);
}

function AppNavigator() {
	// account for the home indicator / gesture bar on iOS so the floating
	// tab bar doesn't sit too close to (or get clipped by) the bottom edge
	const insets = useSafeAreaInsets();

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: [styles.tabBar, { bottom: insets.bottom + 12 }],
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomePage}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={require("./assets/personicon.png")} />
					),
				}}
			/>
			<Tab.Screen
				name="Neighbourhood"
				component={NeighbourhoodPage}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={require("./assets/communityicon.png")} />
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsPage}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} source={require("./assets/settingsicon.png")} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		left: 16,
		right: 16,
		height: 64,
		borderRadius: 32,
		backgroundColor: "#F5F3FB",
		borderTopWidth: 0,
		paddingHorizontal: 8,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
	},
	iconWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	pill: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	pillActive: {
		backgroundColor: PILL_COLOR,
	},
	iconImage: {
		width: 24,
		height: 24,
	},
});