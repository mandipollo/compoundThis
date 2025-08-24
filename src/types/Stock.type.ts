import { Dispatch, SetStateAction } from "react";

// search suggestion types
export interface SearchResultItem {
	ticker: string;
	name: string | null;
	market: string | null;
	primary_exchange: string | null;
	type: string | null;
}
export type SearchBarType = {
	setSelectedStock?: Dispatch<SetStateAction<string>>;
};

// financial accordian

interface StatementItem {
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
export interface StatementData {
	success: boolean;
	data: {
		incomeStatement: IncomeStatementInterface[];
		balanceSheet: BalanceSheetInterface[];
		cashFlow: CashFlowInterface[];
	};
}
