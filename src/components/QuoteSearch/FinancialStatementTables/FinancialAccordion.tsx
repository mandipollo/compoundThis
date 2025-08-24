"use client";

// ui
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// components
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlow from "./CashFlow";

// hooks
import useQuoteStatement from "@/hooks/swr/useQuoteStatement";

// types
import { StatementData } from "@/types/Stock.type";

const FinancialAccordion = ({ selectedQuote }: { selectedQuote: string }) => {
	const {
		data,
		error,
		isLoading,
	}: { data: StatementData; error: string; isLoading: boolean } =
		useQuoteStatement(selectedQuote);

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}
	const { balanceSheet, cashFlow, incomeStatement } = data.data;
	console.log(data);

	return (
		<Accordion type="multiple" className="w-full">
			{incomeStatement && (
				<AccordionItem value="item-1">
					<AccordionTrigger>Income Statement</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<IncomeStatement incomeStatement={incomeStatement} />
					</AccordionContent>
				</AccordionItem>
			)}

			{balanceSheet && (
				<AccordionItem value="item-2">
					<AccordionTrigger>Balance Sheet</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<BalanceSheet balanceSheet={balanceSheet} />
					</AccordionContent>
				</AccordionItem>
			)}

			<AccordionItem value="item-3">
				<AccordionTrigger>Cash Flow</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4 text-balance">
					<CashFlow cashFlow={cashFlow} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default FinancialAccordion;
