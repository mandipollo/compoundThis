import React from "react";
import { format } from "date-fns";
//TYPES
import { SearchResultItem } from "@/types/Search.type";
//HOOKS
import useDailySummary from "@/hooks/swr/holding/useSummary";
const SelectedStockDisplay = ({
	selectedStock,
	date,
}: {
	selectedStock: SearchResultItem;
	date: Date;
}) => {
	// fetch latest price of the stock

	const { isLoading, error, data } = useDailySummary({
		ticker: selectedStock?.ticker,
		date: date,
	});
	if (!selectedStock) return null;
	if (error) {
		return <div>Error</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!data) {
		return <div>Ohoo</div>;
	}
	return (
		<div className="grid grid-cols-2">
			<div className="flex flex-col gap-2">
				<div className=" flex flex-row gap-2 text-xl">
					<span className="border-r-1 border-black pr-2">
						{selectedStock.ticker}
					</span>
					<span>{selectedStock.primary_exchange}</span>
				</div>
				<span>{selectedStock.name}</span>
			</div>
			<div className="flex justify-end items-end flex-col gap-2">
				<span>USD{data?.data?.close || data?.data?.open}</span>
				<span>on {format(new Date(data.data.from), "do LLL yyyy")}</span>
			</div>
		</div>
	);
};

export default SelectedStockDisplay;
