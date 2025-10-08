"use client";

// Ui
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type ChartDataKey = "base" | "current";
const BaseAtGlanceChart = ({
	currentValue,
	baseValue,
}: {
	currentValue: number;
	baseValue: number;
}) => {
	const chartData: { key: ChartDataKey; label: String; value: number }[] = [
		{ key: "base", label: "Base Value", value: baseValue },
		{ key: "current", label: "Current value", value: currentValue },
	];

	const chartConfig = {
		base: {
			label: "Base Value",
			color: "#3b82f6",
		},
		current: {
			label: "Current value",
			color: "#10b981",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Base at glance</CardTitle>
				<CardDescription>Avg investment price vs current value</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 ">
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 50,
						}}
					>
						<XAxis type="number" hide />
						<YAxis
							dataKey="label"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>

						<Bar dataKey="value" radius={5}>
							{chartData.map(entry => (
								<Cell key={entry.key} fill={chartConfig[entry.key].color} />
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default BaseAtGlanceChart;
