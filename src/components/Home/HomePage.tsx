import React from "react";
import Index from "./Index/Index";
import CallToAction from "./CallToAction";
import StocksOnMove from "./Stocks/StocksOnMove";
import TodaysNews from "./News/TodaysNews";
import EarningCalender from "./Earnings/EarningCalender";
import EtfLandingList from "./Etf/EtfLandingList";
import InvestmentIdeaSection from "./InvestmentIdeasSection/InvestmentIdeaSection";
import StockChart from "./Stocks/StockChart";
import VideosSection from "./VideoLanding/VideosSection";

const HomePage = () => {
	return (
		<section className="flex flex-1 flex-col items-center gap-4  relative">
			<Index />
			<CallToAction />
			<div className="flex max-w-5xl w-full justify-center flex-row gap-4 ">
				<div className="flex w-full  flex-col gap-2">
					<StocksOnMove />
					<TodaysNews />
				</div>
				<div className="flex flex-col gap-2">
					<StockChart />
					<EarningCalender />
					<EtfLandingList />
				</div>
			</div>
			<VideosSection />
			<InvestmentIdeaSection />
		</section>
	);
};

export default HomePage;
