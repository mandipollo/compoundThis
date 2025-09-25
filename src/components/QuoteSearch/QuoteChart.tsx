"use client";

// ui
import { Loader2Icon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// hooks
import useQuoteChart from "@/hooks/swr/useQuoteChart";

// types
import { ChartBarData } from "@/types/CustomChartBar.type";

// demo
export const description = "A simple area chart";

const QuoteChart = ({ selectedQuote }: { selectedQuote: string }) => {
	if (!selectedQuote) {
		return null;
	}
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: ChartBarData[] };
		error: string;
		isLoading: boolean;
	} = useQuoteChart(selectedQuote);

	if (error) {
		return <div>Error</div>;
	}
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (!data) {
		return <Loader2Icon className="animate-spin" />;
	}

	const chartBar = data?.data;

	const chartConfig = {
		desktop: {
			label: selectedQuote,
			color: "#002c28",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle className="text-xl">{selectedQuote}</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="bg-white">
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartBar}
						margin={{
							left: 0,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="time"
							tickLine={true}
							axisLine={true}
							tickMargin={8}
							tickFormatter={value => {
								const date = new Date(value * 1000);
								const hours = String(date.getHours()).padStart(2, "0");
								const minutes = String(date.getMinutes()).padStart(2, "0");
								return `${hours}:${minutes}`;
							}}
						/>
						<YAxis
							dataKey="close"
							domain={([min, max]) => {
								const padding = (max - min) * 0.1;
								return [min - padding, max + padding];
							}} // padding to the min and max of the data
							tickFormatter={value => value.toFixed(2)} // optional formatting
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="close"
							type="natural"
							fill="var(--color-desktop)"
							fillOpacity={0.4}
							stroke="var(--color-desktop)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default QuoteChart;
