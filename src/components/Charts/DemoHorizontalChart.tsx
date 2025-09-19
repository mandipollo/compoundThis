"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Price comparision";

const chartData = [
	{ data: "currentPrice", price: 275, fill: "var(--color-currentPrice)" },
	{
		data: "avgPurchasePrice",
		price: 200,
		fill: "var(--color-avgPurchasePrice)",
	},
];

const chartConfig = {
	currentPrice: {
		label: "Current price",
		color: "var(--chart-2)",
	},
	avgPurchasePrice: {
		label: "Avg purchase price",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

const DemoHorizontalChart = () => {
	return (
		<Card>
			<CardHeader className="px-0 ">
				<CardTitle className="text-xl font-light">Price comparision</CardTitle>
				<CardDescription className="text-xs">
					Updated on 18 september 2025
				</CardDescription>
			</CardHeader>
			<CardContent className="px-0">
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 0,
						}}
						barSize={40}
					>
						<YAxis
							dataKey="data"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value =>
								chartConfig[value as keyof typeof chartConfig]?.label
							}
						/>
						<XAxis dataKey="price" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="price" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
		</Card>
	);
};

export default DemoHorizontalChart;
