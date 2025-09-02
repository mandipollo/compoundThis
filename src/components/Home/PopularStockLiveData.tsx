import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { WebSocketPopularStockData } from "@/types/Stock.type";

const PopularStockLiveData = ({
	wsStockData,
}: {
	wsStockData: Record<string, WebSocketPopularStockData>;
}) => {
	console.log(wsStockData);

	return (
		<TableBody>
			<TableRow className="text-center">
				<TableCell>AAPL</TableCell>
				<TableCell>$ {wsStockData["AAPL"]?.c.toFixed(2) ?? "N/A"}</TableCell>
			</TableRow>
			<TableRow className="text-center">
				<TableCell>TSLA</TableCell>
				<TableCell>$ {wsStockData["TSLA"]?.c.toFixed(2) ?? "N/A"}</TableCell>
			</TableRow>
			<TableRow className="text-center">
				<TableCell>GOOG</TableCell>
				<TableCell>$ {wsStockData["GOOG"]?.c.toFixed(2) ?? "N/A"}</TableCell>
			</TableRow>
			<TableRow className="text-center">
				<TableCell>MSFT</TableCell>
				<TableCell>$ {wsStockData["MSFT"]?.c.toFixed(2) ?? "N/A"}</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default PopularStockLiveData;
