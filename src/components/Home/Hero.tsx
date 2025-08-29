"use client";
import React, { useEffect } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import InfiniteScrollLogo from "./InfiniteScrollLogo";
import Container from "../Containers/Container";
import Link from "next/link";

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
						</div>
						<div className="flex flex-col max-w-md gap-6">
							<p className="text-xl">
								Analyzes market data in real-time, delivering clear, actionable
								insights so you can invest with clarity and confidence.
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
							<Link
								href={"/auth/signup"}
								className="relative inline-flex items-center justify-center py-2 bg-green-800 overflow-hidden text-white rounded-md shadow-2xl group"
							>
								<span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-green-600 via-green-700 to-red-400 group-hover:opacity-100"></span>

								<span className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-500 to-transparent opacity-5 h-1/3"></span>

								<span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-500to-transparent opacity-5"></span>

								<span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-green-500to-transparent opacity-5"></span>

								<span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-green-500to-transparent opacity-5"></span>
								<span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
								<span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
								<span className="relative">Decode Now</span>
							</Link>
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
