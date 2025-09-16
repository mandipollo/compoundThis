"use client";

// ui

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

// configs
export const description = "A simple area chart";

const demoGrowthData = [
	{ year: 2015, TICKER: 50000 },
	{ year: 2016, TICKER: 72000 },
	{ year: 2017, TICKER: 103500 },
	{ year: 2018, TICKER: 150000 },
	{ year: 2019, TICKER: 220000 },
	{ year: 2020, TICKER: 310000 },
	{ year: 2021, TICKER: 410000 },
	{ year: 2022, TICKER: 500000 },
	{ year: 2023, TICKER: 580000 },
	{ year: 2024, TICKER: 660649.87 },
];
export const chartConfig = {
	TICKER: { label: "Demo Stock", color: "#1f77b4" },
} satisfies ChartConfig;

const InvestmentChart = ({ totalValue }: { totalValue: number }) => {
	return (
		<Card>
			<CardContent className="bg-white px-0">
				<ChartContainer config={chartConfig}>
					<AreaChart accessibilityLayer data={demoGrowthData}>
						<CartesianGrid vertical={true} horizontal={false} />
						<XAxis
							dataKey="year"
							tickLine={false}
							axisLine={true}
							tickMargin={8}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>

						<Area
							type="monotone"
							dataKey="TICKER"
							stroke="#1f77b4"
							fill="#1f77b4"
							fillOpacity={0.2}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="bg-white text-black px-0">
				<Table>
					<TableHeader>
						<TableRow className="bg-accent text-xs">
							<TableHead>SUMMARY</TableHead>
							<TableHead>CAPITAL GAIN</TableHead>
							<TableHead>DIVIDENDS</TableHead>
							<TableHead>TOTAL RETURN</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Your portfolio</TableCell>
							<TableCell>£100,000</TableCell>
							<TableCell>TBD</TableCell>
							<TableCell>£{totalValue}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">%</TableCell>
							<TableCell>15.12%</TableCell>
							<TableCell>0.76%</TableCell>
							<TableCell>15.88%</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardFooter>
		</Card>
	);
};

export default InvestmentChart;
