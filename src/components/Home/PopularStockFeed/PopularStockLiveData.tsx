// types

import { PopularTickerData } from "@/types/PopularTickers.type";
import { WebSocketPopularStockData } from "@/types/WebSocketPopularTickers.type";
// ui
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const PopularStockLiveData = ({
	wsStockData,
	snapshotData,
}: {
	wsStockData: Record<string, WebSocketPopularStockData>;
	snapshotData: PopularTickerData;
}) => {
	return (
		<TableBody>
			<TableRow>
				<TableCell>AAPL</TableCell>
				<TableCell>{wsStockData["AAPL"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "AAPL")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>TSLA</TableCell>
				<TableCell>{wsStockData["TSLA"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "TSLA")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell>GOOG</TableCell>
				<TableCell>{wsStockData["GOOG"]?.c.toFixed(2) ?? "N/A"}</TableCell>
				<TableCell>
					{snapshotData &&
						snapshotData.tickers.find(item => item.ticker === "GOOG")?.prevDay
							.c}
				</TableCell>
			</TableRow>
			<TableRow>
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
