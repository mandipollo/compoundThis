import { Dispatch, SetStateAction } from "react";

// search suggestion types
export interface SearchResultItem {
	ticker: string | null;
	name: string | null;
	market: string | null;
	primary_exchange: string | null;
	type: string | null;
}

interface SearchSuggestionItem {
	ticker: string | null;
	name: string | null;
	market: string | null;
	locale: string | null;
	cik: string | null;
	primary_exchange: string | null;
	type: string | null;
	active: boolean | null;
	currency_name: string | null;
	composite_figi: string | null;
	share_class_figi: string | null;
	last_updated_utc: string | null;
}
export interface SearchSuggestionResponse {
	count: number | null;
	next_url: string | null;
	request_id: string | null;
	status: string | null;
	results: SearchSuggestionItem[] | [];
}
export type SearchBarType = {
	setSelectedStock?: Dispatch<SetStateAction<string>>;
};

// market status

export interface MarketStatusData {
	afterHours: boolean;
	earlyHours: boolean;
	exchanges: {
		nasdaq: "extended-hours" | "open" | "closed";
		nyse: "extended-hours" | "open" | "closed";
	};
	serverTime: string;
	market: "extended-hours" | "open" | "closed";
}
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

// market movers

export interface TopMarketMoversTickerData {
	day: {
		c: number | null;
		h: number | null;
		l: number | null;
		o: number | null;
		v: number | null;
		vw: number | null;
	};
	ticker: string;
	todaysChange: number | null;
	todaysChangePerc: number | null;
	updated: number | null;
}

// popular stocks

export interface TickerSnapshot {
	day: {
		c: number | null;
		h: number | null;
		l: number | null;
		o: number | null;
		v: number | null;
		vw: number | null;
	};

	min: {
		av: number | null;
		c: number | null;
		h: number | null;
		l: number | null;
		n: number | null;
		o: number | null;
		t: number | null;
		v: number | null;
		vw: number | null;
	};
	prevDay: {
		c: number | null;
		h: number | null;
		l: number | null;
		o: number | null;
		v: number | null;
		vw: number | null;
	};
	ticker: string;
	todaysChange: number | null;
	todaysChangePerc: number | null;
	updated: number | null;
}

export interface PopularTickerData {
	tickers: TickerSnapshot[];
	status: string | null;
	request_id: string | null;
	count: number | null;
}

// webSocket stock data

export interface WebSocketPopularStockData {
	a: number;
	av: number;
	c: number;
	e: number;
	ev: string;
	h: number;
	l: number;
	o: number;
	s: number;
	sym: string;
	v: number;
	vw: number;
	z: number;
}
