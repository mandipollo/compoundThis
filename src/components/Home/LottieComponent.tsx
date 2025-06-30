"use client";

import savingsLottie from "@/animation/lottie/savings-lottie.json";
import aiLottie from "@/animation/lottie/ai.json";
import researchLottie from "@/animation/lottie/research.json";
import { useLottie } from "lottie-react";
import React from "react";

interface lottieComponentProps {
	animation: "savings" | "ai" | "research";
}
const Lottiecomponent: React.FC<lottieComponentProps> = ({ animation }) => {
	let animationData;
	switch (animation) {
		case "savings":
			animationData = savingsLottie;
			break;
		case "research":
			animationData = researchLottie;
			break;
		case "ai":
			animationData = aiLottie;
			break;
		default:
			animationData = savingsLottie;
	}

	const defaultOptions = {
		animationData: animationData,
		loop: true,
	};

	const { View } = useLottie(defaultOptions);

	return (
		<div className="flex justify-center items-center py-10">
			<div className="w-full h-full">{View}</div>
		</div>
	);
};

export default Lottiecomponent;
