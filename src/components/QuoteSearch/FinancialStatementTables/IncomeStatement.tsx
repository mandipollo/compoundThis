//ui
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";
// utils
import numberToDispaly from "@/utils/numberFormatter";
// types

import { IncomeStatementInterface } from "./FinancialAccordion";

export interface ChartDataInterface {
	date: string;
	revenue: number;
	netInc: number;
}

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "#2563eb",
	},
	netInc: {
		label: "NetInc",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

const IncomeStatement = ({
	incomeStatement,
}: {
	incomeStatement: IncomeStatementInterface[];
}) => {
	const chartData: ChartDataInterface[] = incomeStatement.map(item => ({
		date: item.date,
		revenue:
			item.incomeStatement.find(x => x.dataCode === "revenue")?.value || 0,
		netInc: item.incomeStatement.find(x => x.dataCode === "netinc")?.value || 0,
	}));
	const latestQuarter = incomeStatement[0];

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
					<Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
					<Bar dataKey="netInc" fill="var(--color-netInc)" radius={4} />
				</BarChart>
			</ChartContainer>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>(USD)</TableHead>
						<TableHead className="text-right">{latestQuarter.date}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{latestQuarter.incomeStatement.map(data => (
						<TableRow key={data.dataCode}>
							<TableCell>
								{data.dataCode[0].toUpperCase() + data.dataCode.slice(1)}
							</TableCell>
							<TableCell className="text-right">
								{numberToDispaly(data.value)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default IncomeStatement;
