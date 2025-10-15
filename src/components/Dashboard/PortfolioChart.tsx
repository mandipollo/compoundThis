"use client";

import * as React from "react";

// Ui
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
// Hooks
import usePortfolioTimeSeries from "@/hooks/swr/portfolio/usePortfolioTimeSeries";
// Configs
export const description = "An interactive area chart";
const chartConfig = {
	baseValue: {
		label: "BaseValue",
		color: "var(--chart-2)",
	},
	currentValue: {
		label: "CurrentValue",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

const PortfolioChart = () => {
	const [timeRange, setTimeRange] = React.useState("90d");
	const { data, isLoading, error } = usePortfolioTimeSeries();

	//
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}

	if (error) {
		return <div>{error}</div>;
	}
	if (!data.data) {
		return <div>Ohoo </div>;
	}

	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Portfolio graph</CardTitle>
					<CardDescription>
						Showing portfolio growth since first holding purchase
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="hidden w-sm rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Since first purchase" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Since first purchase
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={data.data}>
						<defs>
							<linearGradient id="fillBaseValue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-baseValue)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-baseValue)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillCurrentValue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-currentValue)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-currentValue)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={value => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									year: "2-digit",
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickCount={3}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={value => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="baseValue"
							type="natural"
							fill="url(#fillBaseValue)"
							stroke="var(--color-baseValue)"
						/>
						<Area
							dataKey="currentValue"
							type="natural"
							fill="url(#fillCurrentValue)"
							stroke="var(--color-currentValue)"
						/>
						<ChartLegend
							content={<ChartLegendContent payload={undefined} />}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default PortfolioChart;
