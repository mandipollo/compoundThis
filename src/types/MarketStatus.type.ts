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
