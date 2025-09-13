"use client";

import React, { useEffect } from "react";

// components
import FinancialAccordion from "./FinancialStatementTables/FinancialAccordion";
import QuoteChart from "./QuoteChart";
import QuoteAbout from "./QuoteFundamental/QuoteAbout";
import QuoteDailySummary from "./QuoteFundamental/QuoteDailySummary";

// store
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";

//
const SelectedQuoteComponent = () => {
	const { selectedQuote, clearSelectedQuote } = useSelectedQuoteStore();

	useEffect(() => {
		return () => {
			clearSelectedQuote();
		};
	}, []);
	if (!selectedQuote) {
		return (
			<section className="w-full h-full flex justify-center items-center">
				Animation to be added
			</section>
		);
	}
	return (
		<section className="flex flex-col gap-4">
			<div className="grid grid-cols-[2fr_1fr] gap-4">
				<div className="flex flex-col gap-2 w-full">
					<QuoteChart selectedQuote={selectedQuote} />
					<FinancialAccordion selectedQuote={selectedQuote} />
				</div>
				<div className="flex flex-col gap-2">
					<QuoteDailySummary selectedQuote={selectedQuote} />
					<QuoteAbout selectedQuote={selectedQuote} />
				</div>
			</div>
		</section>
	);
};

export default SelectedQuoteComponent;
