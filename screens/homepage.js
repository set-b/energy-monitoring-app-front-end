import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PixelSmileyClock } from "../components/pixelClock";
import { getToday } from "../api/energyService";

export default function HomePage() {
	const insets = useSafeAreaInsets();

	const [production, setProduction] = useState(0.0);
	const [consumption, setConsumption] = useState(0.0);

	useEffect(() => {
		async function load() {
			try {
				const resultProduction = await getToday("production");
				const resultConsumption = await getToday("consumption");
				setProduction(resultProduction);
				setConsumption(resultConsumption);
			} catch (err) {
				console.warn("Fetch for production today failed! See error below:");
				console.error(err.message);
			}
		}
		load();
	}, []);

	// The maximum digits long mobiles can display is 3 digits, so convert to kilowatts after 1000 watts
	const parseWatts = (value) =>
		value > 999 ? (value / 1000).toFixed(2) : value;
	const parseUnit = (value) => (value > 999 ? "kW" : "W");

	return (
		<ScrollView
			style={styles.safeArea}
			contentContainerStyle={[
				styles.container,
				{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 120 },
			]}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>My House</Text>
			</View>

			{/* Main Content */}
			<View style={styles.content}>
				<View style={styles.textContainer}>
					<Text style={styles.subHeading}>
						The best time for Appliance use is:
					</Text>
					<Text style={styles.mainHeading}>Now!</Text>
				</View>

				{/* Clock Component */}
				<View style={styles.clockSlot}>
					<PixelSmileyClock />
				</View>

				{/* Cards */}
				<View style={styles.cardsRow}>
					<View style={styles.card}>
						<Text style={styles.cardLabel}>Production</Text>
						<View style={styles.valueWrapper}>
							<View style={styles.valueRow}>
								<Text style={styles.cardValue}>{parseWatts(production)}</Text>
								<Text style={styles.cardUnit}>{parseUnit(production)}</Text>
							</View>
						</View>
					</View>
					<View style={styles.card}>
						<Text style={styles.cardLabel}>Consumption</Text>
						<View style={styles.valueWrapper}>
							<View style={styles.valueRow}>
								<Text style={styles.cardValue}>
									{parseWatts(consumption)}
								</Text>
								<Text style={styles.cardUnit}>{parseUnit(consumption)}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flexGrow: 1,
		paddingHorizontal: 24,
		alignItems: "center",
	},
	header: {
		alignItems: "center",
		paddingVertical: 16,
	},
	title: {
		fontSize: 17,
		fontWeight: "500",
		color: "#1F1F1F",
	},
	content: {
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		gap: 24,
	},
	textContainer: {
		alignItems: "center",
	},
	subHeading: {
		fontSize: 16,
		color: "#1F1F1F",
		textAlign: "center",
	},
	mainHeading: {
		fontSize: 24,
		fontWeight: "600",
		color: "#1F1F1F",
		marginTop: 8,
	},
	clockSlot: {
		width: 220,
		height: 220,
		alignItems: "center",
		justifyContent: "center",
	},
	cardsRow: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
	},
	card: {
		flex: 1,
		height: 140,
		backgroundColor: "#8ECA78",
		borderRadius: 24,
		padding: 16,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	cardLabel: {
		fontSize: 20,
		color: "#FFFFFF",
		marginBottom: 0,
	},
	valueRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	cardValue: {
		fontSize: 64,
		fontWeight: "bold",
		color: "#FFFFFF",
		lineHeight: 80,
	},
	cardUnit: {
		fontSize: 16,
		color: "#FFFFFF",
	},
	valueWrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});