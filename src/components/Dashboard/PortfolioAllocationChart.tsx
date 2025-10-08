"use client";

// Ui

import { Pie, PieChart } from "recharts";
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

// Types
import { UserStockDetails } from "@/types/UserPortfolio.type";

const PortfolioAllocationChart = ({
	portfolio,
}: {
	portfolio: UserStockDetails[];
}) => {
	const chartDataMap = portfolio.map(item => ({
		ticker: item.ticker,
		value:
			(item.snapshot.day.c === 0
				? item.snapshot.prevDay.c
				: item.snapshot.day.c) * item.quantity,
		fill: `var(--color-${item.ticker})`,
	}));
	const chartConfig = portfolio.reduce((acc, item, index) => {
		acc[item.ticker] = {
			label: item.ticker,
			color: `var(--chart-${index + 1})`,
		};
		return acc;
	}, {} as ChartConfig);

	return (
		<Card className="flex flex-col max-w-full w-full">
			<CardHeader className="items-center pb-0">
				<CardTitle>Portfolio</CardTitle>
				<CardDescription>Stock allocation</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 items-center justify-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[50rem] pb-0"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartDataMap} dataKey="value" label nameKey="ticker" />
						<ChartLegend
							content={
								<ChartLegendContent nameKey="ticker" payload={undefined} />
							}
							className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default PortfolioAllocationChart;
