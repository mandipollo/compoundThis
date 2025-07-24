import React from "react";
import Lottiecomponent from "./LottieComponent";

interface FeatureListItemProps {
	title: string;
	text: string;
	animation: "savings" | "research" | "ai";
}
const FeatureListItem: React.FC<FeatureListItemProps> = ({
	title,
	text,
	animation,
}) => {
	return (
		<li
			className="flex flex-col gap-2 max-w-xs w-full bg-slate-50 p-4 border-md rounded-md"
			role="listitem"
		>
			<p className="text-xl">{title}</p>
			<p className="text-gray-400">{text}</p>
			<Lottiecomponent animation={animation} />
		</li>
	);
};

export default FeatureListItem;
