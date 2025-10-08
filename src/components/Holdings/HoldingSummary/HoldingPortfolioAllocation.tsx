"use client";

import { Pie, PieChart, Sector } from "recharts";

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
import useHoldingAllocation from "@/hooks/swr/useHoldingAllocation";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

export const description = "A pie chart with a label";

const HoldingPortfolioAllocation = () => {
	const { data, isLoading, error } = useHoldingAllocation("AAPL");

	if (isLoading) {
		return <div>loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	// const chartData = [
	// 	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	// 	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	// ];
	const chartData = data.data.map((t: any, index: number) => ({
		name: t.name,
		value: t.value,
		fill: `var(--chart-${index + 1})`,
	}));

	const chartConfig = data.data.reduce((acc, item, index) => {
		acc[item.name] = {
			label: item.name,
			color: `var(--chart-${index + 1})`,
		};
		return acc;
	}, {} as ChartConfig);

	return (
		<Card className="flex flex-col max-w-md w-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>Portfolio</CardTitle>
				<CardDescription>Stock allocation</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							defaultIndex={0}
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							strokeWidth={5}
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<Sector {...props} outerRadius={outerRadius + 10} />
							)}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default HoldingPortfolioAllocation;
