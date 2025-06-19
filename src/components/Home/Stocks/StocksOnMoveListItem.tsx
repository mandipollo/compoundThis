import React from "react";

const StocksOnMoveListItem = () => {
	return (
		<li
			role="listitem"
			className="flex flex-row justify-between items-center gap-2 border-t border-t-gray-300 py-2"
		>
			<div className="flex flex-row items-center gap-2">
				<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
					META
				</p>
				<p>Meta Platforms Inc</p>
			</div>

			<span>£546.07</span>
			<span className="text-[#247e45]">£6</span>
			<span className="text-[#247e45]">7.93%</span>
		</li>
	);
};

export default StocksOnMoveListItem;
