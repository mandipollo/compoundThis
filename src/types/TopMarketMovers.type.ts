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
