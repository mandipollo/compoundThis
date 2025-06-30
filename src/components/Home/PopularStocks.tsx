import React from "react";
import StocksOnMoveListItem from "../reusable/Stocks/StocksOnMoveListItem";

const PopularStocks = () => {
	return (
		<section className="flex justify-center items-center w-full h-full bg-primary p-2 py-20">
			<div className="flex max-w-5xl w-full h-72 bg-gradient-to-b from-slate-600 to-[#18312e] p-[1px] rounded-4xl ">
				<div className="flex flex-col w-full h-full bg-[#18312e] rounded-4xl p-10 shadow-md">
					<h2 className="text-2xl text-white">Popular Picks</h2>
					<ul className="flex justify-center items-center flex-col gap-2 w-full">
						<StocksOnMoveListItem
							ticker="META"
							company="Meta Platforms Inc."
							dayChange={23}
							percentageChange={2}
							price={457}
							colorCode="bg-red-400"
						/>
						<StocksOnMoveListItem
							ticker="AAPL"
							company="Apple Inc"
							dayChange={56}
							percentageChange={1}
							price={980}
							colorCode="bg-slate-400"
						/>
						<StocksOnMoveListItem
							ticker="TSCO"
							company="Tesco PLC"
							dayChange={2}
							percentageChange={0.23}
							price={4}
							colorCode="bg-black"
						/>
						<StocksOnMoveListItem
							ticker="GOOG"
							company="Alphabet Inc"
							dayChange={34}
							percentageChange={2.2}
							price={877}
							colorCode="bg-blue-400"
						/>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default PopularStocks;
