import React from "react";
// ui

import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";
// utils
import numberToDispaly from "@/utils/numberFormatter";
import { FormattedCashflow } from "@/types/Stock.type";

// types

const chartConfig = {
	freeCashFlow: {
		label: "FreeCashFlow",
		color: "#2563eb",
	},
	netCashFlow: {
		label: "NetCashFlow",
		color: "#60a5fa",
	},
} satisfies ChartConfig;
interface CashFlowChartData {
	date: string;
	freeCashFlow: number;
	netCashFlow: number;
}
const CashFlow = ({ cashFlow }: { cashFlow: FormattedCashflow[] }) => {
	// chart data

	const chartData: CashFlowChartData[] = cashFlow.map(item => ({
		date: item.fiscal_year + " " + item.fiscal_period,
		freeCashFlow: item.cash_flow.net_cash_flow_continuing.value || 0,
		netCashFlow: item.cash_flow.net_cash_flow.value || 0,
	}));
	const latestQuarter = cashFlow[0];
	return (
		<div>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						dataKey="freeCashFlow"
						fill="var(--color-freeCashFlow)"
						radius={4}
					/>
					<Bar
						dataKey="netCashFlow"
						fill="var(--color-netCashFlow)"
						radius={4}
					/>
				</BarChart>
			</ChartContainer>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>(USD)</TableHead>
						<TableHead className="text-right">
							{latestQuarter.fiscal_year + " " + latestQuarter.fiscal_period}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.values(latestQuarter.cash_flow).map((data, index) => (
						<TableRow key={index}>
							<TableCell>
								{data.label
									? data.label[0].toUpperCase() + data.label.slice(1)
									: "N/A"}
							</TableCell>
							<TableCell className="text-right">
								{data.value
									? numberToDispaly(data.value) + " " + data.unit
									: "N/A"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CashFlow;
