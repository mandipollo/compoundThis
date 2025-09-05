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
import { FormattedFinancialStatementData } from "@/types/Stock.type";

const FinancialAccordion = ({ selectedQuote }: { selectedQuote: string }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: FormattedFinancialStatementData };
		isLoading: boolean;
		error: string;
	} = useQuoteStatement(selectedQuote);

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const { balance_sheet, cash_flow, income_statement } = data.data;

	return (
		<Accordion
			defaultValue="item-1"
			type="single"
			collapsible
			className="w-full"
		>
			{income_statement && (
				<AccordionItem value="item-1">
					<AccordionTrigger>Income Statement</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<IncomeStatement incomeStatement={income_statement} />
					</AccordionContent>
				</AccordionItem>
			)}
			{balance_sheet && (
				<AccordionItem value="item-2">
					<AccordionTrigger>Balance Sheet</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<BalanceSheet balanceSheet={balance_sheet} />
					</AccordionContent>
				</AccordionItem>
			)}

			{cash_flow && (
				<AccordionItem value="item-3">
					<AccordionTrigger>Cash Flow</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-4 text-balance">
						<CashFlow cashFlow={cash_flow} />
					</AccordionContent>
				</AccordionItem>
			)}
		</Accordion>
	);
};

export default FinancialAccordion;
