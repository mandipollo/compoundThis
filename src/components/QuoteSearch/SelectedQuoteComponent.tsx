"use client";

import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";
import React from "react";
import { Separator } from "../ui/separator";
import FinancialAccordion from "./FinancialStatementTables/FinancialAccordion";
import QuoteChart from "./QuoteChart";
import QuoteTopNews from "./QuoteTopNews";
import QuoteAbout from "./QuoteFundamental/QuoteAbout";
import QuoteEOD from "./QuoteFundamental/QuoteEOD";

const SelectedQuoteComponent = () => {
	const { selectedQuote } = useSelectedQuoteStore();

	if (!selectedQuote) {
		return <section></section>;
	}
	return (
		<section className="flex flex-col gap-4">
			<div className="flex flex-row justify-between py-2">
				<h2 className="text-xl">{selectedQuote}</h2>
			</div>

			<Separator />
			<div className="grid grid-cols-[2fr_1fr] gap-4">
				<div className="flex flex-col gap-2 w-full">
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
