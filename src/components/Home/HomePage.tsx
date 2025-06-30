import React from "react";
import Hero from "./Hero";
import Overview from "./Overview";
import PopularStocks from "./PopularStocks";
import StockOverview from "./StockOverview";
const Homepage = () => {
	return (
		<section className="flex flex-col h-full w-full">
			<Hero />
			<Overview />
			<PopularStocks />
			<StockOverview />
		</section>
	);
};

export default Homepage;
