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
		c: number;
		h: number;
		l: number;
		o: number;
		v: number;
		vw: number;
	};

	min: {
		av: number;
		c: number;
		h: number;
		l: number;
		n: number;
		o: number;
		t: number;
		v: number;
		vw: number;
	};
	prevDay: {
		c: number;
		h: number;
		l: number;
		o: number;
		v: number;
		vw: number;
	};
	ticker: string;
	todaysChange: number | null;
	todaysChangePerc: number | null;
	updated: number | null;
}

export interface PopularTickerData {
	tickers: TickerSnapshot[];
	status: string;
	request_id: string;
	count: number;
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

// financial statement

export interface BalanceSheetInterface {
	assets: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	current_assets: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	current_liabilities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	equity: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	equity_attributable_to_noncontrolling_interest: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	equity_attributable_to_parent: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	liabilities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	liabilities_and_equity: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	noncurrent_assets: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	noncurrent_liabilities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
}

export interface CashFlowInterface {
	exchange_gains_losses: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_continuing: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_financing_activities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_financing_activities_continuing: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_investing_activities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_investing_activities_continuing: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_operating_activities: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_cash_flow_from_operating_activities_continuing: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
}

export interface IncomeStatementInterface {
	basic_earnings_per_share: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	benefits_costs_expenses: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	cost_of_revenue: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	costs_and_expenses: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	diluted_earnings_per_share: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	gross_profit: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	income_loss_from_continuing_operations_after_tax: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	income_loss_from_continuing_operations_before_tax: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	income_tax_expense_benefit: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	interest_expense_operating: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_income_loss: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_income_loss_attributable_to_noncontrolling_interest: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_income_loss_attributable_to_parent: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	net_income_loss_available_to_common_stockholders_basic: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	operating_expenses: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	operating_income_loss: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	participating_securities_distributed_and_undistributed_earnings_loss_basic: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	preferred_stock_dividends_and_other_adjustments: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
	revenues: {
		label: string;
		order: number | null;
		unit: string;
		value: number | null;
	};
}

export interface FormattedBalanceSheet {
	fiscal_year: string;
	fiscal_period: string;
	balance_sheet: BalanceSheetInterface;
}

export interface FormattedIncomeStatement {
	fiscal_year: string;
	fiscal_period: string;
	income_statement: IncomeStatementInterface;
}

export interface FormattedCashflow {
	fiscal_year: string;
	fiscal_period: string;
	cash_flow: CashFlowInterface;
}

export interface FormattedFinancialStatementData {
	income_statement: FormattedIncomeStatement[];
	balance_sheet: FormattedBalanceSheet[];
	cash_flow: FormattedCashflow[];
}
