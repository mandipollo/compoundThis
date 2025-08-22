"use client";
import React, { useEffect } from "react";
import Container from "../Containers/Container";
import FeatureCard from "./FeatureCard";
import { Gradient } from "./gradient";
const FeaturesSectionGuide1 = () => {
	// bg gradient

	useEffect(() => {
		// Initialize the gradient after the component mounts
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);
	return (
		<section className="flex relative flex-col gap-10 h-full w-full py-38 items-center ">
			<canvas
				id="gradient-canvas"
				className="absolute inset-0 -z-10 w-full h-full"
				style={
					{
						"--gradient-color-1": "#002c28",
						"--gradient-color-2": "#A5C9CA",
						"--gradient-color-3": "#4E9F3D",
					} as React.CSSProperties
				}
			/>

			<Container>
				<div className="flex flex-col gap-10">
					<div className="grid grid-cols-2 gap-2  ">
						<div className="flex flex-wrap gap-2">
							<span className="text-6xl">Seemless</span>
							<span className="text-6xl">data.</span>
							<span className="text-6xl">Actionable</span>
							<span className="text-6xl">insights</span>
						</div>
						<div></div>
					</div>
					<div className="grid grid-cols-3 gap-10 items-center justify-center ">
						<FeatureCard description="Realtime data directly streamed from IEX" />
						<FeatureCard description="Estimate future portfolio value with ease" />
						<FeatureCard description="Custom Notification System" />
					</div>
				</div>
			</Container>
		</section>
	);
};

export default FeaturesSectionGuide1;
