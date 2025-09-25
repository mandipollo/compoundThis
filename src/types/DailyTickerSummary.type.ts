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
