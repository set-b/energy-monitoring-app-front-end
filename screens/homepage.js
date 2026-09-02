import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PixelSmileyClock } from "../components/pixelClock";
import { getToday, getBest } from "../api/energyService";

export default function AppScreen() {
	const [production, setProduction] = useState(0.0);
	const [consumption, setConsumption] = useState(0.0);
	const [best, setBest] = useState(0);

	// The maximum digits long mobiles can display is 3 digits, so convert to kilowatts after 1000 watts
	const parseWatts = (value) =>
		Math.abs(value) > 999
			? Math.abs(Math.round(value / 1000))
			: Math.round(value);
	const parseUnit = (value) => (Math.abs(value) > 999 ? "kW" : "W");

	const parseBest = (best) => {
		const concat =
			best === 0
				? " is right now!"
				: best < 0
					? " not today"
					: " is about " + best + " hours from now";
					: " is about " +
						best +
						" hour" +
						(best === 1 ? "" : "s") +
						" from now";
		return concat;
	};

	useEffect(() => {
		async function load() {
			try {
				const resultProduction = await getToday("production");
				const resultConsumption = await getToday("consumption");
				const resultBest = await getBest();
				setProduction(resultProduction);
				setConsumption(resultConsumption);
				setBest(resultBest);
			} catch (err) {
				console.warn("Fetch for production today failed! See error below:");
				console.error(err.message);
			}
		}
		load();
	}, []);

	return (
		<ScrollView style={styles.safeArea} contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>My House</Text>
				</View>

				{/* Main Content */}
				<View style={styles.content}>
					<View style={styles.textContainer}>
						<Text style={styles.subHeading}>
							The best time for using your appliances
						</Text>
						<Text style={styles.mainHeading}>{parseBest(best)}</Text>
					</View>

					{/* Clock Component */}
					<View style={styles.clockSlot}>
						<PixelSmileyClock
							ranges={[
								{ start: 3.5, end: 5.5, color: "#D32F2F" },
								{ start: 8.5, end: 1, color: "#386A20" },
							]}
						/>
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
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 24,
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
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
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
		alignItems: "flex-start", // Change from center
		justifyContent: "flex-start", // Change from center
	},
	cardLabel: {
		fontSize: 20,
		color: "#FFFFFF",
		marginBottom: 0,
	},
	valueRow: {
		flexDirection: "row",
		alignItems: "baseline", // Aligns the bottom of the unit with the number
	},
	cardValue: {
		fontSize: 64,
		fontWeight: "bold",
		color: "#FFFFFF",
		lineHeight: 80, // Adjust this to tighten the gap
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
