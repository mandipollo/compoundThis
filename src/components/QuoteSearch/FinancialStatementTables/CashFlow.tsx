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
import { CashFlowInterface } from "@/types/Stock.type";

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
const CashFlow = ({ cashFlow }: { cashFlow: CashFlowInterface[] }) => {
	// chart data

	const chartData: CashFlowChartData[] = cashFlow.map(item => ({
		date: item.date,
		freeCashFlow:
			item.cashFlow.find(x => x.dataCode === "freeCashFlow")?.value || 0,
		netCashFlow: item.cashFlow.find(x => x.dataCode === "ncf")?.value || 0,
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
							{latestQuarter?.date ?? "N/A"}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{latestQuarter?.cashFlow?.map((data, index) => (
						<TableRow key={index}>
							<TableCell>
								{data.dataCode[0]
									? data.dataCode[0].toUpperCase() + data.dataCode.slice(1)
									: "N/A"}
							</TableCell>
							<TableCell className="text-right">
								{data.value ? numberToDispaly(data.value) : "N/A"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default CashFlow;
