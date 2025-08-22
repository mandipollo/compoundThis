import React from "react";

//TODO: EXPAND ON THE CARD DETAILS
const FeatureCard = ({ description }: { description: string }) => {
	return (
		<div className="flex relative flex-col h-80 p-8 shadow-md rounded-2xl bg-primaryLight">
			<span className="text-xl ">{description}</span>
		</div>
	);
};

export default FeatureCard;
