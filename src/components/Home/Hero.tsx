"use client";
import React, { useEffect } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import InfiniteScrollLogo from "./InfiniteScrollLogo";
import Container from "../Containers/Container";

const Hero = () => {
	return (
		<section className="relative flex flex-col pt-48 items-center ">
			<Container>
				<div className="grid grid-cols-2 justify-center items-center w-full h-full ">
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
								actionable insights so you can invest with clarity and
								confidence.
							</p>

							<ul role="list" className="flex flex-col gap-2">
								<li
									role="itemlist"
									className="flex flex-row gap-2 items-center"
								>
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
								<li
									role="itemlist"
									className="flex flex-row gap-2 items-center"
								>
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
								<li
									role="itemlist"
									className="flex flex-row gap-2 items-center"
								>
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
							<Button className="shadow-md bg-green-700 hover:bg-green-600 border py-2">
								Decode the Market Now
							</Button>
						</div>
					</div>
					<div className="flex justify-center items-center max-w-2xl w-full">
						<div className="relative flex h-full w-full items-center justify-center">
							<Image
								unoptimized
								priority
								height={300}
								width={300}
								alt="gif depicting intelligence"
								src="/hero-animation.gif"
							/>
						</div>
					</div>
				</div>
				<InfiniteScrollLogo />
			</Container>
		</section>
	);
};

export default Hero;
