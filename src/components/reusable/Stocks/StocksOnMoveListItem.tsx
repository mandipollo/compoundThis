import React from "react";

interface PopularStockListItemProps {
	colorCode: string;
	ticker: string;
	company: string;
	price: number;
	dayChange: number;
	percentageChange: number;
}
const StocksOnMoveListItem: React.FC<PopularStockListItemProps> = ({
	ticker,
	company,
	price,
	dayChange,
	percentageChange,
	colorCode,
}) => {
	return (
		<li
			role="listitem"
			className=" grid grid-cols-4 w-full items-center gap-2 border-b border-b-gray-500 py-2 text-gray-300"
		>
			<div className="flex flex-row items-center gap-4">
				<p
					className={`text-xs ${colorCode}  rounded-md px-2 py-1 items-center flex`}
				>
					{ticker}
				</p>
				<p>{company}</p>
			</div>
			<span className="flex justify-center">£{price}</span>
			<span className="text-[#247e45] flex justify-center">£{dayChange}</span>
			<span className="text-[#247e45] flex justify-center">
				{percentageChange}%
			</span>
		</li>
	);
};

export default StocksOnMoveListItem;
