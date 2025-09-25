export interface Cashflow {
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
