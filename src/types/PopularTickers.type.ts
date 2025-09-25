// popular stocks

import { TickerSnapshot } from "./TickerSnapshot.type";

export interface PopularTickerData {
	tickers: TickerSnapshot[];
	status: string;
	request_id: string;
	count: number;
}
