import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";

const THEMES = {
	light: {
		bg: "#D1E8CF", // Light sage/pistachio green ring face
		accentRing: "#3A7042", // Dark forest green active arc segment
		faceDetails: "#1F1F1F", // Deep charcoal for eyes & smile
		hourHand: "#1F1F1F", // Charcoal hour hand
		minuteHand: "#1F1F1F", // Charcoal minute hand
	},
	dark: {
		bg: "#2D3B2D", // Dark muted green container
		accentRing: "#82C175", // Bright sage green active arc segment
		faceDetails: "#E8F5E9", // Off-white/light mint details
		hourHand: "#E8F5E9", // Off-white/light mint hour hand
		minuteHand: "#E8F5E9", // Off-white/light mint minute hand
	},
};

export const PixelSmileyClock = ({ size = 180 }) => {
	const [time, setTime] = useState(new Date());
	const scheme = useColorScheme();
	const theme = THEMES[scheme === "dark" ? "dark" : "light"];
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
				<Circle cx="90" cy="90" r="90" fill={theme.bg} />

				{/* --- SMILEY FACE ELEMENTS --- */}
				{/* Left Eye */}
				<Circle cx="60" cy="65" r="7" fill={theme.faceDetails} />

				{/* Right Eye */}
				<Circle cx="120" cy="65" r="7" fill={theme.faceDetails} />

				{/* Smile Arc */}
				<Path
					d="M 62 120 A 30 30 0 0 0 118 120"
					fill="none"
					stroke={theme.faceDetails}
					strokeWidth="6"
					strokeLinecap="round"
				/>

				{/* --- CLOCK HANDS --- */}
				{/* Hour Hand (Thick Pill) */}
				<G transform={`rotate(${hourAngle}, 90, 90)`}>
					<Rect
						x="81"
						y="42"
						width="18"
						height="58"
						rx="9"
						fill={theme.hourHand}
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
						fill={theme.minuteHand}
					/>
				</G>

				{/* Center Pivot */}
				<Circle cx="90" cy="90" r="6" fill={theme.hourHand} />
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
