import React from "react";
import Hero from "./Hero";

import PopularStocks from "./PopularStocks";
import StockOverview from "./StockOverview";
import CtaPage from "./CtaPage";
import FeaturesSectionGuide1 from "./FeaturesSectionGuide1";
import FeaturesSectionGuide2 from "./FeaturesSectionGuide2";
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
