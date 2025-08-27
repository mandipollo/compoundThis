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

// About section

export interface AboutData {
	marketCap: number | null;
	ticker: string | null;
	name: string | null;
	description: string | null;
	homePageUrl: string | null;
	listDate: string | null;
	market: string | null;
	primaryExchange: string | null;
	totalEmployees: number | null;
	logoUrl: string | null;
	iconUrl: string | null;
	city: string | null;
	state: string | null;
}

// daily ticker summary

export interface DailyTickerSummary {
	status: string;
	from: string;
	symbol: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	afterHours: number;
	preMarket: number;
}

// Company End of the day data

export interface FundamentalData {
	close: number | null;
	date: string | null;
	open: number | null;
	pbRatio: number | null;
	trailingPEG1Y: number | null;
	previousClose: number | null;
	high: number | null;
	low: number | null;
	marketCap: number | null;
	volume: number | null;
	peRatio: number | null;
	dividend: number | null;
}

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

// custom bar chart

export interface ChartBarData {
	c: number | null;
	h: number | null;
	l: number | null;
	n: number | null;
	o: number | null;
	t: number | null;
	v: number | null;
	vw: number | null;
}
