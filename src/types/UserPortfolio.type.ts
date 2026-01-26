import { FormattedSingleTickerSnapshot } from "./TickerSnapshot.type";

enum TransactionType {
	"BUY",
	"SELL",
}
export interface Transaction {
	id: number;
	date: Date;
	price: number;
	transactionType: TransactionType;
	quantity: number;
	stockId: number;
}
export interface UserStock {
	id: number;
	ticker: string;
	companyName: string;
	portfolioId: number;
	quantity: number;
	avgPurchasePrice: number;
	transactions: Transaction[];
	snapshot: FormattedSingleTickerSnapshot;
}
export interface UserPortfolio {
	id: number;
	portfolioName: string;
	curreny: string;
	portfolioHolderId: number;
	stocks: UserStock[];
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
