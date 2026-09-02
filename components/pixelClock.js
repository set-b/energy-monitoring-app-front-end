import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";

const THEMES = {
	light: {
		green: {
			bg: "#D8E7CB", // Primary Container (soft sage/pistachio background)
			accentRing: "#386A20", // Primary (vibrant accent arc)
			faceDetails: "#191E19", // On Surface / On Primary Container (deep charcoal/dark green)
			hourHand: "#191E19", // On Primary Container (high-contrast hand)
			minuteHand: "#191E19", // On Primary Container (high-contrast hand)
		},
		red: {
			bg: "#FFDAD4", // Deeper/richer Error Container (stronger soft red background)
			accentRing: "#D32F2F", // Material M3 High-Chroma Red (strong, bold active arc)
			faceDetails: "#3B0907", // Deep mahogany charcoal (crisp contrast)
			hourHand: "#3B0907", // Deep mahogany charcoal
			minuteHand: "#3B0907", // Deep mahogany charcoal
		},
		yellow: {
			bg: "#FFDEA1", // Tertiary Container (soft warm amber/yellow background)
			accentRing: "#7A5900", // Tertiary / Warm Accent (dark golden yellow active arc)
			faceDetails: "#261900", // On Tertiary Container (deep charcoal/dark amber)
			hourHand: "#261900", // On Tertiary Container
			minuteHand: "#261900", // On Tertiary Container
		},
	},
	dark: {
		green: {
			bg: "#D8E7CB", // Primary Container (soft sage/pistachio background)
			accentRing: "#386A20", // Primary (vibrant accent arc)
			faceDetails: "#191E19", // On Surface / On Primary Container (deep charcoal/dark green)
			hourHand: "#191E19", // On Primary Container (high-contrast hand)
			minuteHand: "#191E19", // On Primary Container (high-contrast hand)
		},
		red: {
			bg: "#FFDAD4", // Deeper/richer Error Container (stronger soft red background)
			accentRing: "#D32F2F", // Material M3 High-Chroma Red (strong, bold active arc)
			faceDetails: "#3B0907", // Deep mahogany charcoal (crisp contrast)
			hourHand: "#3B0907", // Deep mahogany charcoal
			minuteHand: "#3B0907", // Deep mahogany charcoal
		},
		yellow: {
			bg: "#FFDEA1", // Tertiary Container (soft warm amber/yellow background)
			accentRing: "#7A5900", // Tertiary / Warm Accent (dark golden yellow active arc)
			faceDetails: "#261900", // On Tertiary Container (deep charcoal/dark amber)
			hourHand: "#261900", // On Tertiary Container
			minuteHand: "#261900", // On Tertiary Container
		},
	},
	// dark: {
	// 	bg: "#2D3B2D", // Dark muted green container
	// 	accentRing: "#82C175", // Bright sage green active arc segment
	// 	faceDetails: "#E8F5E9", // Off-white/light mint details
	// 	hourHand: "#E8F5E9", // Off-white/light mint hour hand
	// 	minuteHand: "#E8F5E9", // Off-white/light mint minute hand
	// },
};

export const PixelSmileyClock = ({ size = 180, state = "happy" }) => {
	const [time, setTime] = useState(new Date());
	const scheme = useColorScheme();
	const theme = THEMES[scheme === "dark" ? "dark" : "light"];
	const smileyState = state; // happy, sad, neutral
	const colorMap = {
		happy: "green",
		sad: "red",
		neutral: "yellow",
	};
	const smileyColor = colorMap[smileyState];
	const smileyWidth = "11";
	const smileyReactions = {
		happy: "M 52 110  A 40 40 0 0 0  128 110",
		neutral: "M 52 120  L 128 120",
		sad: "M 52 130  A 40 40 0 0 1  128 130",
	};

	const interval = 60; // in seconds

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), interval * 1000);
		return () => clearInterval(timer);
	}, []);

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	// Rotation calculations
	const hourAngle = (hours % 12) * 30 + minutes * 0.5;
	const minuteAngle = minutes * 6 + seconds * 0.1;

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<Svg width={size} height={size} viewBox="0 0 180 180">
				{/* Clean Round Face */}
				<Circle cx="90" cy="90" r="90" fill={theme[smileyColor].bg} />

				{/* the white sub background */}
				<Circle cx="90" cy="90" r="70" fill={"#fff"} />

				{/* --- SMILEY FACE ELEMENTS --- */}
				{/* Left Eye */}
				<Circle
					cx="60"
					cy="65"
					r={smileyWidth}
					fill={theme[smileyColor].faceDetails}
				/>

				{/* Right Eye */}
				<Circle
					cx="120"
					cy="65"
					r={smileyWidth}
					fill={theme[smileyColor].faceDetails}
				/>

				{/* Smile Arc */}
				<Path
					d={smileyReactions[smileyState]}
					fill="none"
					stroke={theme[smileyColor].faceDetails}
					strokeWidth={smileyWidth}
					strokeLinecap="round"
				/>

				{/* --- CLOCK HANDS --- */}
				{/* Hour Hand (Thick Pill) */}
				<G transform={`rotate(${hourAngle}, 90, 90)`}>
					<Rect
						x="81"
						y="42"
						width="14"
						height="58"
						rx="9"
						fill={theme[smileyColor].hourHand}
					/>
				</G>

				{/* Minute Hand (Slightly Thinner & Longer) */}
				<G transform={`rotate(${minuteAngle}, 90, 90)`}>
					<Rect
						x="83"
						y="22"
						width="14"
						height="78"
						rx="7"
						fill={theme[smileyColor].minuteHand}
					/>
				</G>

				{/* Center Pivot */}
				<Circle cx="90" cy="90" r="6" fill={theme[smileyColor].hourHand} />
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
});
