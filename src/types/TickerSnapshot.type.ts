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
