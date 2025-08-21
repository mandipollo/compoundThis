import React from "react";

interface FeatureListItemProps {
	title: string;
	text: string;
	animation: "savings" | "research" | "ai";
}
const FeatureListItem: React.FC<FeatureListItemProps> = ({ title, text }) => {
	return (
		<li
			className="flex flex-col gap-2 max-w-xs w-full p-4 border-md rounded-md"
			role="listitem"
		>
			<p className="text-xl">{title}</p>
			<p className="text-gray-400">{text}</p>
		</li>
	);
};

export default FeatureListItem;
