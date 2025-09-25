"use client";

import React from "react";

// ui
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";

// components
import DemoChart from "../../Charts/DemoChart";
import DemoHorizontalChart from "./HorizontalChart";
import HoldingSummaryTable from "./HoldingSummaryTable";
import HoldingCurrentValue from "./HoldingCurrentValue";
import HoldingInvestment from "./HoldingInvestment";

//Hooks
import useIndividualStockPortfolio from "@/hooks/swr/useIndividualStockPortfolio";
import useQuoteDailySummary from "@/hooks/swr/useQuoteDailySummary";
import DemoChartPie from "@/components/Charts/DemoPieChart";

const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}

	const {
		error,
		data,
		isLoading,
	}: { error: string; data: any; isLoading: boolean } =
		useIndividualStockPortfolio({ ticker });

	const {
		data: dailyData,
		error: errorDaily,
		isLoading: isLoadingDaily,
	} = useQuoteDailySummary(ticker);
	if (isLoading || isLoadingDaily) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error || errorDaily) {
		return <div>{error}</div>;
	}

	// details of the stock from portfolfio
	const {
		buyDate,
		buyPrice,
		quantity,
	}: { buyDate: string; buyPrice: number; quantity: number } = data.data;

	// daily summary of the ticker

	const { close, from } = dailyData.data;
	console.log(dailyData);

	return (
		<div className="flex flex-col w-full gap-2 h-full ">
			<div className="grid w-full gap-2 grid-cols-[2fr_1fr]">
				<div className="flex flex-col gap-4">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Timespan" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="first">Since first purchase</SelectItem>
							<SelectItem value="month">In this month</SelectItem>
							<SelectItem value="week">In last week</SelectItem>
						</SelectContent>
					</Select>

					<HoldingSummaryTable
						dailyPrice={close}
						purchasePrice={buyPrice}
						buyDate={buyDate}
					/>
					<DemoChart />
					<DemoChartPie />
				</div>
				<div className="flex flex-col gap-2">
					<HoldingCurrentValue
						dailyPrice={close}
						price={buyPrice}
						quantity={quantity}
					/>
					<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
						<DemoHorizontalChart
							from={from}
							dailyPrice={close}
							price={buyPrice}
						/>
					</div>
					<HoldingInvestment
						currentPrice={close}
						buyPrice={buyPrice}
						quantity={quantity}
					/>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-center rounded-md border shadow-md ">
				<span className="text-xl">AI feature to be added </span>
			</div>
		</div>
	);
};

export default HoldingsSummary;
