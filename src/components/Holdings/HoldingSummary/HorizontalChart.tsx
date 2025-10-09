"use client";

// Ui
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

const HorizontalChart = ({
	price,
	dailyPrice,
	from,
}: {
	price: number;
	dailyPrice: number;
	from: string;
}) => {
	const chartData = [
		{
			data: "currentPrice",
			price: dailyPrice,
			fill: "var(--color-currentPrice)",
		},
		{
			data: "avgPurchasePrice",
			price: price,
			fill: "var(--color-avgPurchasePrice)",
		},
	];

	const chartConfig = {
		currentPrice: {
			label: "Current price",
			color: "var(--chart-1)",
		},
		avgPurchasePrice: {
			label: "Avg purchase price",
			color: "var(--chart-4)",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col gap-2 ">
			<CardHeader className="px-0 ">
				<CardTitle className="text-md font-semibold">
					Price comparision
				</CardTitle>
				<CardDescription className="text-xs">Updated on {from}</CardDescription>
			</CardHeader>
			<CardContent className="px-0">
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 12,
						}}
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

export default HorizontalChart;
