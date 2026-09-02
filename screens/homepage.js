import React from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import Svg, { Path, Circle, Polyline } from "react-native-svg";
import { PixelSmileyClock } from "../components/pixelClock";

// Import your separate clock component here
// import { PixelClockWidget } from './PixelClockWidget';

export default function AppScreen() {
	return (
		<View style={styles.safeArea}>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>My House</Text>
				</View>

				{/* Main Body */}
				<View style={styles.content}>
					<Text style={styles.subHeading}>
						The best time for Appliance use is:
					</Text>
					<Text style={styles.mainHeading}>Now!</Text>

					{/* CLOCK COMPONENT SLOT */}
					<View style={styles.clockSlot}>
						{/* Replace this placeholder with <PixelClockWidget /> */}
						{/* <View style={styles.clockPlaceholder}>
							<Text style={styles.placeholderText}>[ Clock Component ]</Text>
						</View> */}
						<PixelSmileyClock />
					</View>

					{/* Carousel Dots */}
					<View style={styles.dotsRow}>
						<View style={styles.dot} />
						<View style={styles.dot} />
						<View style={[styles.dot, styles.activeDot]} />
						<View style={styles.dot} />
						<View style={styles.dot} />
						<View style={styles.dot} />
					</View>

					{/* Content Cards */}
					<View style={styles.cardsRow}>
						<View style={styles.card} />
						<View style={styles.card} />
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between",
	},
	header: {
		alignItems: "center",
		marginTop: 8,
	},
	headerTime: {
		alignSelf: "flex-start",
		fontSize: 14,
		fontWeight: "600",
		color: "#000000",
		marginLeft: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1F1F1F",
		marginTop: 4,
	},
	content: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	subHeading: {
		fontSize: 15,
		color: "#1F1F1F",
	},
	mainHeading: {
		fontSize: 22,
		fontWeight: "600",
		color: "#1F1F1F",
		marginTop: 6,
		marginBottom: 16,
	},
	clockSlot: {
		marginVertical: 10,
		width: 200,
		height: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	clockPlaceholder: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "#D1E8CF",
		borderStyle: "dashed",
		alignItems: "center",
		justifyContent: "center",
	},
	placeholderText: {
		color: "#82C175",
		fontWeight: "600",
	},
	dotsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginVertical: 20,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#D1D5DB",
	},
	activeDot: {
		backgroundColor: "#1F1F1F",
	},
	cardsRow: {
		flexDirection: "row",
		gap: 16,
		width: "100%",
	},
	card: {
		flex: 1,
		height: 110,
		backgroundColor: "#82C175",
		borderRadius: 24,
	},
	floatingBadge: {
		position: "absolute",
		right: 28,
		bottom: 90,
		width: 28,
		height: 28,
		backgroundColor: "#7A5299",
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
		borderBottomLeftRadius: 14,
		borderBottomRightRadius: 4,
		alignItems: "center",
		justifyContent: "center",
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	bottomNav: {
		height: 64,
		backgroundColor: "#F5EEF8",
		borderRadius: 32,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 8,
		marginBottom: 8,
	},
	navItem: {
		alignItems: "center",
		gap: 3,
	},
	activeIconBg: {
		backgroundColor: "#E8DEF8",
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderRadius: 16,
	},
	navLabel: {
		fontSize: 11,
		color: "#5F6368",
		fontWeight: "500",
	},
	activeNavLabel: {
		fontSize: 11,
		color: "#1F1F1F",
		fontWeight: "600",
	},
});
