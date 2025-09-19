"use client";

// ui

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

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

const DemoChart = () => {
	return (
		<ChartContainer config={chartConfig}>
			<AreaChart accessibilityLayer data={demoGrowthData}>
				<CartesianGrid vertical={true} horizontal={false} />
				<XAxis dataKey="year" tickLine={false} axisLine={true} tickMargin={8} />

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
	);
};

export default DemoChart;
