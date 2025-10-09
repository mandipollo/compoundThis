import { TickerSnapshot } from "./TickerSnapshot.type";

export interface UserStockDetails {
	buyDate: string;
	buyPrice: number;
	companyName: string;
	currency: string;
	id: number;
	portfolioId: number;
	quantity: number;
	ticker: string;
	snapshot: TickerSnapshot;
}

export interface UserPortfolio {
	createdAt: string;
	currency: string;
	id: number;
	portfolioHolderId: number;
	portfolioName: string;
	stocks: UserStockDetails[];
}

export interface timeSeriesChartData {
	date: string;
	baseValue: number;
	currentValue: number;
}

export interface timeSeriesholding {
	date: string;
	value: number;
}
