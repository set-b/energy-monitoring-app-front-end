import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { PixelSmileyClock } from "../components/pixelClock";
import { getToday } from "../api/energyService";

export default function AppScreen() {
	const [data, setData] = useState("loading...");
	const [production, setProduction] = useState(null);
	const [consumption, setConsumption] = useState(null);

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
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
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
							<Text>{production}</Text>
						</View>
						<View style={styles.card}>
							<Text>{consumption}</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
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
	},
});
