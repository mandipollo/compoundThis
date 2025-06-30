import React from "react";

const StockChart = () => {
	return (
		<div className="flex flex-col gap-1 rounded-md p-2 w-72 border border-gray-300">
			<div className="flex justify-between">
				<p>META</p>
				<span>£546.07</span>
			</div>
			<div className="flex justify-between">
				<p>META PLATFORM INC</p>
				<span>£6</span>
			</div>
			<div className="flex h-44 w-full items-center justify-center">CHART</div>
			<ul className="flex flex-col gap-2 w-full text-xs ">
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">PREVIOUS CLOSE</p>
					<span>£534.09</span>
				</li>
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">DAY RANGE</p>
					<span>£552.30 - £575.83</span>
				</li>
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">YEAR RANGE</p>
					<span>£534.09 - £578</span>
				</li>
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">MARKET CAP</p>
					<span>£2.12T</span>
				</li>
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">P/E RATIO</p>
					<span>18.09</span>
				</li>
				<li className="flex flex-row justify-between w-full border-t border-gray-200 py-2">
					<p className="text-gray-500">DIVIDEND YIELD</p>
					<span>1.09%</span>
				</li>
			</ul>
		</div>
	);
};

export default StockChart;
