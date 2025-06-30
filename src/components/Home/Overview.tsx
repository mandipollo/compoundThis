import React from "react";
import FeatureListItem from "./FeatureListItem";

const Overview = () => {
	return (
		<section className=" flex flex-col justify-center items-center w-full h-full  bg-primary ">
			<div className=" flex flex-col justify-center items-center w-full h-full gap-20 py-20  bg-white rounded-b-4xl">
				<div className="flex w-full max-w-5xl">
					<h2 className="text-5xl  font-extralight">
						Your blueprint for <span className="italic">lasting growth</span>
					</h2>
				</div>
				<ul role="list" className="flex flex-row gap-10 ">
					<FeatureListItem
						animation="savings"
						title="Grow with confidence"
						text="Smooth out chunky payables, conserve your working capital, and invest where it matters most."
					/>
					<FeatureListItem
						animation="research"
						title="Research Stocks"
						text="Smooth out chunky payables, conserve your working capital, and invest where it matters most."
					/>
					<FeatureListItem
						animation="ai"
						title="Empowered with A.I"
						text="Smooth out chunky payables, conserve your working capital, and invest where it matters most."
					/>
				</ul>
			</div>
		</section>
	);
};

export default Overview;
