import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";
import { ColorTheme } from "./colorTheme";

const THEMES = {
	light: ColorTheme,
	dark: ColorTheme,
};

export const PixelSmileyClock = ({
	size = 180,
	state = "happy",
	// Example range format: [{ start: 3.5, end: 5.5, color: "#386A20" }]
	ranges = [
		{ start: 3.5, end: 5.5, color: "#386A20" }, // 3:30 to 5:30 active segment
	],
}) => {
	const [time, setTime] = useState(new Date());
	const scheme = useColorScheme();
	const theme = THEMES[scheme === "dark" ? "dark" : "light"];
	const smileyState = state;
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

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 60000);
		return () => clearInterval(timer);
	}, []);

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	const hourAngle = (hours % 12) * 30 + minutes * 0.5;
	const minuteAngle = minutes * 6 + seconds * 0.1;

	// Arc calculations
	const ringRadius = 80;
	const ringStrokeWidth = 14;
	const circumference = 2 * Math.PI * ringRadius;

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<Svg width={size} height={size} viewBox="0 0 180 180">
				{/* Background Outer Ring (Light track) */}
				<Circle
					cx="90"
					cy="90"
					r={ringRadius}
					fill="none"
					stroke={theme[smileyColor].bg}
					strokeWidth={ringStrokeWidth}
				/>

				{/* --- DYNAMIC TIME RANGE ARCS --- */}
				{ranges.map((range, index) => {
					const startAngle = (range.start % 12) * 30 - 90;
					const duration = (range.end - range.start + 12) % 12 || 12;
					const arcLength = (duration / 12) * circumference;

					return (
						<Circle
							key={index}
							cx="90"
							cy="90"
							r={ringRadius}
							fill="none"
							stroke={range.color || theme[smileyColor].accentRing}
							strokeWidth={ringStrokeWidth}
							strokeDasharray={`${arcLength} ${circumference}`}
							strokeLinecap="round"
							transform={`rotate(${startAngle}, 90, 90)`}
						/>
					);
				})}

				{/* Inner White Face */}
				<Circle cx="90" cy="90" r="70" fill="#fff" />

				{/* --- SMILEY FACE ELEMENTS --- */}
				<Circle
					cx="60"
					cy="65"
					r={smileyWidth}
					fill={theme[smileyColor].faceDetails}
				/>
				<Circle
					cx="120"
					cy="65"
					r={smileyWidth}
					fill={theme[smileyColor].faceDetails}
				/>
				<Path
					d={smileyReactions[smileyState]}
					fill="none"
					stroke={theme[smileyColor].faceDetails}
					strokeWidth={smileyWidth}
					strokeLinecap="round"
				/>

				{/* --- CLOCK HANDS --- */}
				<G transform={`rotate(${hourAngle}, 90, 90)`}>
					<Rect
						x="81"
						y="42"
						width="14"
						height="58"
						rx="9"
						fill={theme[smileyColor].hourHand}
						opacity={0.8}
					/>
				</G>
				<G transform={`rotate(${minuteAngle}, 90, 90)`}>
					<Rect
						x="83"
						y="22"
						width="14"
						height="78"
						rx="7"
						fill={theme[smileyColor].minuteHand}
						opacity={0.8}
					/>
				</G>
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
