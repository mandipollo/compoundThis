"use client";
import React from "react";
import { ChartAreaDefault } from "../ChartHome";
import StockFundamentalOverview from "../../Stock/StockFundamentalOverview";
import Container from "../../Containers/Container";
import QuoteChart from "@/components/QuoteSearch/QuoteChart";
import { useHomeSelectedQuoteStore } from "@/store/homeSelectedQuoteStore";
import QuoteTopNews from "@/components/QuoteSearch/QuoteTopNews";
import QuoteDailySummary from "@/components/QuoteSearch/QuoteFundamental/QuoteDailySummary";
import QuoteAbout from "@/components/QuoteSearch/QuoteFundamental/QuoteAbout";
import FinancialAccordion from "@/components/QuoteSearch/FinancialStatementTables/FinancialAccordion";

const StockOverview = () => {
	const { selectedQuote } = useHomeSelectedQuoteStore();
	return (
		<section className=" flex justify-center items-center w-full h-full bg-primary font-extralight ">
			<div className=" flex justify-center items-center w-full h-full  bg-white rounded-t-4xl">
				<Container>
					<div className="grid grid-cols-[3fr_2fr] gap-4 py-10">
						<div className="flex flex-col gap-2 w-full">
							<QuoteChart selectedQuote={selectedQuote} />
							<FinancialAccordion selectedQuote={selectedQuote} />
						</div>
						<div className="flex flex-col gap-2">
							<QuoteDailySummary selectedQuote={selectedQuote} />
							<QuoteAbout selectedQuote={selectedQuote} />
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default StockOverview;
