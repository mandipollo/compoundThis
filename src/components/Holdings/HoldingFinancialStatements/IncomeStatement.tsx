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
import { FormattedIncomeStatement } from "@/types/FinancialStatement.type";
// types

export interface ChartDataInterface {
	fiscal_period: string;
	revenue: number;
	netInc: number;
}

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "var(--chart-1)",
	},
	grossProfit: {
		label: "GrossProfit",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

const IncomeStatement = ({
	incomeStatement,
}: {
	incomeStatement: FormattedIncomeStatement[];
}) => {
	const chartData = incomeStatement.map(item => ({
		date: item.fiscal_year + " " + item.fiscal_period,
		revenue: item.income_statement.revenues.value,
		grossProfit: item.income_statement.gross_profit.value,
	}));

	const latestQuarter = incomeStatement[incomeStatement.length - 1];

	return (
		<div>
			<ChartContainer
				config={chartConfig}
				className="min-h-[100px] max-h-[500px] h-full w-full"
			>
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
					<Bar
						dataKey="grossProfit"
						fill="var(--color-grossProfit)"
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
					{Object.values(latestQuarter.income_statement).map((data, index) => (
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

export default IncomeStatement;
