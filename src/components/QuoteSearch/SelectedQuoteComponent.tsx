"use client";

import React, { useEffect } from "react";

// ui
import { Separator } from "../ui/separator";

// components
import FinancialAccordion from "./FinancialStatementTables/FinancialAccordion";
import QuoteChart from "./QuoteChart";
import QuoteTopNews from "./QuoteTopNews";
import QuoteAbout from "./QuoteFundamental/QuoteAbout";
import QuoteEOD from "./QuoteFundamental/QuoteEOD";

// store
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";
import QuoteLiveFeed from "./QuoteLiveFeed";

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
			<div className="flex flex-row justify-between py-2">
				<h2 className="text-xl">{selectedQuote}</h2>
			</div>

			<Separator />
			<div className="grid grid-cols-[2fr_1fr] gap-4">
				<div className="flex flex-col gap-2 w-full">
					<QuoteLiveFeed ticker={selectedQuote} />
					<QuoteChart />
					<QuoteTopNews />
					<FinancialAccordion />
				</div>
				<div className="flex flex-col gap-2">
					<QuoteEOD />
					<QuoteAbout />
				</div>
			</div>
		</section>
	);
};

export default SelectedQuoteComponent;
