import React from "react";
//ui
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
//utils
import numberToDispaly from "@/utils/numberFormatter";
import { FormattedBalanceSheet } from "@/types/Stock.type";

//types

const chartConfig = {
	totalAssets: {
		label: "TotalAssets",
		color: "#2563eb",
	},
	totalLiabilities: {
		label: "TotalLiabilties",
		color: "#60a5fa",
	},
} satisfies ChartConfig;
interface BalanceSheetChartData {
	date: string;
	totalAssets: number;
	totalLiabilities: number;
}
const BalanceSheet = ({
	balanceSheet,
}: {
	balanceSheet: FormattedBalanceSheet[];
}) => {
	// chart data

	const chartData: BalanceSheetChartData[] = balanceSheet.map(item => ({
		date: item.fiscal_year + " " + item.fiscal_period,
		totalAssets: item.balance_sheet.assets.value || 0,
		totalLiabilities: item.balance_sheet.liabilities.value || 0,
	}));
	const latestQuarter = balanceSheet[0];
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
						dataKey="totalAssets"
						fill="var(--color-totalAssets)"
						radius={4}
					/>
					<Bar
						dataKey="totalLiabilities"
						fill="var(--color-totalLiabilities)"
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
					{Object.values(latestQuarter.balance_sheet).map((data, index) => (
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

export default BalanceSheet;
