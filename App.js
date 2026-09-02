import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomePage from "./screens/homepage";
import NeighbourhoodPage from "./screens/neighbourhoodpage";
import SettingsPage from "./screens/settingspage";

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#000";
const INACTIVE_COLOR = "#8E8E93";
const PILL_COLOR = "#EDE9F7";

function TabIcon({ focused, iconName, label }) {
	return (
		<View style={styles.iconWrapper}>
			<View style={[styles.pill, focused && styles.pillActive]}>
				<Ionicons
					name={iconName}
					size={22}
					color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
				/>
			</View>
			<Text style={[styles.label, focused && styles.labelActive]}>
				{label}
			</Text>
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: styles.tabBar,
				}}
			>
				<Tab.Screen
					name="Home"
					component={HomePage}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused} iconName="home" label="My Home" />
						),
					}}
				/>
				<Tab.Screen
					name="Neighbourhood"
					component={NeighbourhoodPage}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon
								focused={focused}
								iconName="people"
								label="Neighbourhood"
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsPage}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused} iconName="settings" label="Settings" />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		left: 16,
		right: 16,
		bottom: 24,
		height: 76,
		borderRadius: 32,
		backgroundColor: "#F5F3FB",
		borderTopWidth: 0,
		paddingTop: 10,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 6,
	},
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	pill: {
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 20,
	},
	pillActive: {
		backgroundColor: PILL_COLOR,
	},
	label: {
		fontSize: 11,
		color: INACTIVE_COLOR,
	},
	labelActive: {
		color: ACTIVE_COLOR,
		fontWeight: "600",
	},
});