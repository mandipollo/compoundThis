export interface BalanceSheet {
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
