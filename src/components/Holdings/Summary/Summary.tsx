"use client";
import React from "react";
// UI
import { Loader2Icon } from "lucide-react";
// COMPONENTS
import ComparisionChart from "./ComparisionChart";
import HoldingSummaryTable from "./Table";
import HoldingCurrentValue from "./CurrentValue";
import HoldingInvestment from "./Investment";
import HoldingPortfolioAllocation from "./Allocation";
import HoldingTimeSeriesChart from "./TimeSeriesChart";
// HOOKS
import useHolding from "@/hooks/swr/holding/useHolding";
import useSnapshot from "@/hooks/swr/holding/useSnapshot";
const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}
	const {
		error,
		data,
		isLoading,
	}: { error: string; data: any; isLoading: boolean } = useHolding({ ticker });

	const {
		data: snapshotData,
		error: snapshotError,
		isLoading: snapshotLoading,
	} = useSnapshot({ ticker });
	console.log(snapshotData);

	if (isLoading || snapshotLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error || snapshotError) {
		return <div>{error}</div>;
	}
	// details of the stock from portfolfio
	const {
		buyDate,
		buyPrice,
		quantity,
	}: { buyDate: string; buyPrice: number; quantity: number } = data.data;
	// latest holding snapshot
	const { price, updated } = snapshotData.data;
	return (
		<div className="flex flex-col w-full gap-2 h-full ">
			<div className="grid w-full gap-2 grid-cols-[2fr_1fr]">
				<div className="flex flex-col gap-4">
					<HoldingSummaryTable
						dailyPrice={price}
						purchasePrice={buyPrice}
						buyDate={buyDate}
					/>
					<HoldingTimeSeriesChart holding={ticker} />
					<div className="flex flex-1 items-center justify-center rounded-md border shadow-md ">
						<span className="text-xl">AI feature to be added </span>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<HoldingCurrentValue
						dailyPrice={price}
						price={buyPrice}
						quantity={quantity}
					/>
					<HoldingPortfolioAllocation ticker={ticker} />
					<ComparisionChart
						from={updated}
						dailyPrice={price}
						price={buyPrice}
					/>
					<HoldingInvestment
						currentPrice={price}
						buyPrice={buyPrice}
						quantity={quantity}
					/>
				</div>
			</div>
		</div>
	);
};

export default HoldingsSummary;
