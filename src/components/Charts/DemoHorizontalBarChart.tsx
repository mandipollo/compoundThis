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

export const description = "A horizontal bar chart";

const chartData = [
	{ month: "Avg base", desktop: 186 },
	{ month: "Current base", desktop: 305 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

const DemoHorizontalBarChart = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Base at glance</CardTitle>
				<CardDescription>Avg investment price vs current value</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 10,
						}}
					>
						<XAxis type="number" dataKey="desktop" hide />
						<YAxis
							dataKey="month"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default DemoHorizontalBarChart;
