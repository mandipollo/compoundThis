"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashFlow from "./CashFlow";
import useQuoteStatement from "@/hooks/swr/useQuoteStatement";
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";

export interface StatementItem {
	dataCode: string;
	value: number;
}
export interface IncomeStatementInterface {
	date: string;
	year: number;
	quarter: number;
	incomeStatement: StatementItem[];
}
export interface BalanceSheetInterface {
	date: string;
	year: number;
	quarter: number;
	balanceSheet: StatementItem[];
}
export interface CashFlowInterface {
	date: string;
	year: number;
	quarter: number;
	cashFlow: StatementItem[];
}
interface StatementData {
	success: boolean;
	data: {
		incomeStatement: IncomeStatementInterface[];
		balanceSheet: BalanceSheetInterface[];
		cashFlow: CashFlowInterface[];
	};
}
const FinancialAccordion = () => {
	const { selectedQuote } = useSelectedQuoteStore();

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

	console.log(data);
	const { balanceSheet, cashFlow, incomeStatement } = data.data;

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
