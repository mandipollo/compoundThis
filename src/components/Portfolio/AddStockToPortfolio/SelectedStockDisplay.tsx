import { SearchResultItem } from "@/types/Search.type";
import React from "react";

const SelectedStockDisplay = ({
	selectedStock,
}: {
	selectedStock: SearchResultItem | null;
}) => {
	if (!selectedStock) {
		return;
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
				<span>Latest price</span> <span>Date</span>
			</div>
		</div>
	);
};

export default SelectedStockDisplay;
