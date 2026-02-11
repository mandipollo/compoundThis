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
//STORE
import { useFxStore } from "@/store/fxRateStore";
const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}
	// fxRate
	const { fxRate } = useFxStore();
	const { error, data, isLoading } = useHolding({ ticker });

	const {
		data: snapshotData,
		error: snapshotError,
		isLoading: snapshotLoading,
	} = useSnapshot({ ticker });

	if (isLoading || snapshotLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error || snapshotError) {
		return <div>{error}</div>;
	}
	// details of the stock from portfolfio
	const { avgPurchasePrice, quantity } = data.data;
	// latest holding snapshot
	const { price, updated } = snapshotData.data;
	//
	const percentageReturn =
		((price - avgPurchasePrice) / avgPurchasePrice) * 100;
	const totalReturn = fxRate
		? fxRate * (price - avgPurchasePrice) * quantity
		: price - avgPurchasePrice * quantity;
	const localCurrencyPrice = fxRate && fxRate * price;
	const localCurrencyReturn = fxRate && fxRate * totalReturn;
	return (
		<div className="flex flex-col w-full gap-2 h-full ">
			<div className="grid w-full gap-2 grid-cols-[2fr_1fr]">
				<div className="flex flex-col gap-4">
					<HoldingSummaryTable
						localCurrencyPrice={localCurrencyPrice}
						localCurrencyReturn={localCurrencyReturn}
						totalReturn={totalReturn}
						percentageReturn={percentageReturn}
						fxRate={fxRate}
					/>
					<HoldingTimeSeriesChart holding={ticker} />
					<div className="flex flex-1 items-center justify-center rounded-md border shadow-md ">
						<span className="text-xl">AI feature to be added </span>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<HoldingCurrentValue
						price={price}
						quantity={quantity}
						totalReturn={totalReturn}
						percentageReturn={percentageReturn}
						fxRate={fxRate}
					/>
					{/* <HoldingPortfolioAllocation ticker={ticker} /> */}
					<ComparisionChart
						from={updated}
						dailyPrice={price}
						price={avgPurchasePrice}
					/>
					<HoldingInvestment
						fxRate={fxRate}
						currentPrice={price}
						buyPrice={avgPurchasePrice}
						quantity={quantity}
					/>
				</div>
			</div>
		</div>
	);
};

export default HoldingsSummary;
