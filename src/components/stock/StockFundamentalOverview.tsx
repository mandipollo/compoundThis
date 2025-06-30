import React from "react";

const StockFundamentalOverview = () => {
	return (
		<ul className="flex flex-col p-4 text-xs">
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">PREVIOUS CLOSE</span>
				<span>£278</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">DAY RANGE</span>
				<span>£278 - £562</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">YEAR RANGE</span>
				<span>£210 - £890</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">MARKET CAP</span>
				<span>1.86T USD</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">AVG VOLUME</span>
				<span>12.01M</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">P/E RATIO</span>
				<span>28.30</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">DIVIDEND YIELD</span>
				<span>0.28%</span>
			</li>
			<li className="flex flex-row justify-between items-center border-gray-300 border-t py-3">
				<span className="text-muted-foreground">PRIMARY EXCHANGE</span>
				<span>NASDAQ</span>
			</li>
		</ul>
	);
};

export default StockFundamentalOverview;
