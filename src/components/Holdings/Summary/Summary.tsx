"use client";
import React from "react";
// UI
import { Loader2Icon } from "lucide-react";
// COMPONENTS
import HoldingSummaryTable from "./Table";
import HoldingCurrentValue from "./CurrentValue";
import DemoTimeSeries from "./DemoTimeSeries";
import Overview from "./Overview";
import Analyst from "./Analyst";
import Events from "./Events";
// HOOKS
import useSummary from "@/hooks/swr/holding/useSummary";
//STORE
import { useFxStore } from "@/store/fxRateStore";

const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}
	// fxRate
	const { fxRate } = useFxStore();
	// hooks
	const { error, data, isLoading } = useSummary({ ticker });

	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error) {
		return <div>{error}</div>;
	}
	const { holding, ratios, snapshot, yearOHLC } = data.data;
	const { avgPurchasePrice, quantity } = holding;
	// latest price
	const dayClose = snapshot.day.c ?? 0;
	const prevClose = snapshot.prevDay.c ?? 0;
	const price = dayClose === 0 ? prevClose : dayClose;
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
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-4">
					<HoldingSummaryTable
						localCurrencyPrice={localCurrencyPrice}
						localCurrencyReturn={localCurrencyReturn}
						totalReturn={totalReturn}
						percentageReturn={percentageReturn}
						fxRate={fxRate}
					/>
					<HoldingCurrentValue
						price={price}
						quantity={quantity}
						totalReturn={totalReturn}
						percentageReturn={percentageReturn}
						fxRate={fxRate}
					/>
				</div>
				<DemoTimeSeries />
				<Overview snapshot={snapshot} ratios={ratios} yearOHLC={yearOHLC} />
				<div className="grid grid-cols-2 gap-2">
					<Analyst />
					<Events />
				</div>
			</div>
		</div>
	);
};

export default HoldingsSummary;
