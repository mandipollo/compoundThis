import React from "react";

// components

import Hero from "./Hero";
import FeaturesSectionGuide1 from "./FeaturesSectionGuide1";
import FeaturesSectionGuide2 from "./FeaturesSectionGuide2";
import PopularStocks from "./PopularStockFeed/PopularStocks";
import StockOverview from "./StockOverview/StockOverview";
import CtaPage from "./CtaPage";

const Homepage = () => {
	return (
		<section className="flex flex-col h-full w-full">
			<Hero />
			<FeaturesSectionGuide1 />
			<FeaturesSectionGuide2 />
			<PopularStocks />
			<StockOverview />
			<CtaPage />
		</section>
	);
};

export default Homepage;
