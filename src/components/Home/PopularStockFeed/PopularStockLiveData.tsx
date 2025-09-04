import React from "react";
import {
	PopularTickerData,
	WebSocketPopularStockData,
} from "@/types/Stock.type";

// ui
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

// utils
import numberToDispaly from "@/utils/numberFormatter";

// hooks
import { useHomeSelectedQuoteStore } from "@/store/homeSelectedQuoteStore";

const PopularStockLiveData = ({
	wsStockData,
	snapshotData,
}: {
	wsStockData: Record<string, WebSocketPopularStockData>;
	snapshotData: PopularTickerData;
}) => {
	const { setSelectedQuote, selectedQuote } = useHomeSelectedQuoteStore();
	return (
		<TableBody>
			<TableRow
				onClick={() => setSelectedQuote("AAPL")}
				className={`${selectedQuote === "AAPL" && "bg-blue-400"} text-center hover:bg-blue-400`}
			>
				<TableCell>AAPL</TableCell>
				<TableCell>{wsStockData["AAPL"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "AAPL")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow
				onClick={() => setSelectedQuote("TSLA")}
				className={`${selectedQuote === "TSLA" && "bg-blue-400"} text-center hover:bg-blue-400`}
			>
				<TableCell>TSLA</TableCell>
				<TableCell>{wsStockData["TSLA"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "TSLA")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow
				onClick={() => setSelectedQuote("GOOG")}
				className={`${selectedQuote === "GOOG" && "bg-blue-400"} text-center hover:bg-blue-400`}
			>
				<TableCell>GOOG</TableCell>
				<TableCell>{wsStockData["GOOG"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "GOOG")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow
				onClick={() => setSelectedQuote("MSFT")}
				className={`${selectedQuote === "MSFT" && "bg-blue-400"} text-center hover:bg-blue-400`}
			>
				<TableCell>MSFT</TableCell>
				<TableCell>{wsStockData["MSFT"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "MSFT")?.prevDay
							.c}
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default PopularStockLiveData;
