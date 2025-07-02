"use client";

//TODO:
//make the lottie aniamte when hovered
//ai animation replacement
import savingsLottie from "@/animation/lottie/savings-lottie.json";
import aiLottie from "@/animation/lottie/ai.json";
import researchLottie from "@/animation/lottie/research.json";
import { useLottie, LottieRefCurrentProps } from "lottie-react";
import React, { useRef, useState } from "react";
import Lottie from "lottie-react";
interface lottieComponentProps {
	animation: "savings" | "ai" | "research";
}
const Lottiecomponent: React.FC<lottieComponentProps> = ({ animation }) => {
	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
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

	return (
		<div
			onMouseEnter={() => lottieRef.current?.play()}
			onMouseLeave={() => lottieRef.current?.stop()}
			className="flex justify-center items-center py-10"
		>
			<Lottie
				lottieRef={lottieRef}
				loop={false}
				autoplay={false}
				animationData={animationData}
			/>
		</div>
	);
};

export default Lottiecomponent;
