import React from "react";
import Movers from "./Movers";

const InvestmentIdeaSection = () => {
	return (
		<div className="flex flex-col gap-2 w-full justify-center items-center py-10">
			<div className="flex flex-col gap-2 w-full max-w-5xl">
				<h6 className="text-xl">Investment Ideas</h6>
				<div className="flex flex-row gap-2 w-full">
					<Movers />
					<Movers />
					<Movers />
				</div>
			</div>
		</div>
	);
};

export default InvestmentIdeaSection;
