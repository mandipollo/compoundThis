"use client";
// ui
import { Loader2Icon, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

import useQuoteChart from "@/hooks/swr/useQuoteChart";
import { ChartBarData } from "@/types/Stock.type";
import { Button } from "../ui/button";

// demo
export const description = "A simple area chart";

const QuoteChart = ({ selectedQuote }: { selectedQuote: string }) => {
	if (!selectedQuote) {
		return;
	}
	const { data, error, isLoading } = useQuoteChart(selectedQuote);

	if (error) {
		return <div>Error</div>;
	}
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (!data) {
		return <Loader2Icon className="animate-spin" />;
	}

	const chartBar: ChartBarData[] = data?.data;
	console.log(chartBar);

	const chartConfig = {
		desktop: {
			label: "META",
			color: "#002c28",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle className="text-xl">{selectedQuote}</CardTitle>
					<CardDescription>Current Price</CardDescription>
					<div role="tablist" className="flex flex-row gap-1">
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							1 D
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							5 D
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							1 M
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							6 M
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							YTD
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							1 Y
						</Button>
						<Button
							role="tab"
							className="bg-white hover:bg-green-200 text-black shadow-md border"
						>
							5 Y
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="bg-white">
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartBar}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="time"
							tickLine={false}
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
							domain={["dataMin", "dataMax"]} // scale to min and max of your data
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
			<CardFooter className="bg-white text-black">
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none font-medium">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="text-muted-foreground flex items-center gap-2 leading-none">
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default QuoteChart;
