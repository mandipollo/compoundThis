import React from "react";
import VideoBG from "./VideoBG";
import SearchBar from "../Layout/search/SearchBar";

const Hero = () => {
	return (
		<section className="relative flex flex-col w-full h-full py-48 ">
			<VideoBG />
			<div className="flex flex-col justify-center items-center w-full h-full text-white">
				<div className="flex flex-col gap-4 items-center max-w-2xl w-full">
					<h1 className="text-6xl"> Master your Portfolio </h1>
					<p className="text-lg text-gray-300">
						A proper financial overview will give you peace of mind.
					</p>
					<SearchBar />
				</div>
			</div>
		</section>
	);
};

export default Hero;
