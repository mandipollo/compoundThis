"use client";
import React, { useEffect } from "react";
import { Gradient } from "./gradient";
import { Button } from "../ui/button";
import Image from "next/image";
import InfiniteScrollLogo from "./InfiniteScrollLogo";

const Hero = () => {
	// bg gradient

	useEffect(() => {
		// Initialize the gradient after the component mounts
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);

	return (
		<section className="relative flex flex-col pt-48 ">
			<canvas
				id="gradient-canvas"
				className="absolute inset-0 -z-10 w-full h-full"
				style={
					{
						"--gradient-color-1": "#FBF3D5",
						"--gradient-color-2": "#FFFFF0",
						"--gradient-color-3": "#002c28",
					} as React.CSSProperties
				}
			/>

			<div className="grid grid-cols-2 justify-center items-center w-full h-full text-black">
				<div className="flex flex-col gap-6 justify-center items-center w-full">
					<div className="flex flex-row flex-wrap max-w-md space-x-2">
						<span className="text-8xl">Decode</span>
						<span className="text-8xl">the</span>
						<span className="text-8xl">Market</span>
						<span className="text-8xl">with</span>
						<span className="text-8xl">AI</span>
					</div>
					<div className="flex flex-col max-w-md gap-6">
						<p className="text-xl">
							Our AI analyzes market data in real-time, delivering clear,
							actionable insights so you can invest with clarity and confidence.
						</p>

						<ul role="list" className="flex flex-col gap-2">
							<li role="itemlist" className="flex flex-row gap-2 items-center">
								<figure>
									<Image
										src={"/check.svg"}
										width={10}
										height={10}
										alt="check icon"
									/>
								</figure>
								Intelligent Insights
							</li>
							<li role="itemlist" className="flex flex-row gap-2 items-center">
								<figure>
									<Image
										src={"/check.svg"}
										width={10}
										height={10}
										alt="check icon"
									/>
								</figure>
								Data-Driven Decisions
							</li>
							<li role="itemlist" className="flex flex-row gap-2 items-center">
								<figure>
									<Image
										src={"/check.svg"}
										width={10}
										height={10}
										alt="check icon"
									/>
								</figure>
								Time-Saving Analysis
							</li>
						</ul>
						<Button className="bg-green-700 hover:bg-green-800 shadow-2xl border-none">
							Decode the Market Now
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-4 items-center max-w-2xl w-full">
					<figure>
						<Image
							alt="gif depicting intelligence"
							width={400}
							height={400}
							src="/hero-animation.gif"
						/>
					</figure>
				</div>
			</div>
			<InfiniteScrollLogo />
		</section>
	);
};

export default Hero;
