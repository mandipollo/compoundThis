import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { PopularTickerData } from "@/types/Stock.type";
import numberToDispaly from "@/utils/numberFormatter";
import React from "react";

const PopularStockSnapShot = ({
	snapshotData,
}: {
	snapshotData: PopularTickerData;
}) => {
	return (
		<TableBody>
			{snapshotData?.tickers?.map(ticker => (
				<TableRow key={ticker.ticker} className="text-center">
					<TableCell>{ticker.ticker}</TableCell>
					<TableCell>
						${ticker.min.c === 0 ? ticker.prevDay.c : ticker.min.c}
					</TableCell>
					<TableCell
						className={
							ticker.todaysChange && ticker.todaysChange > 0
								? "text-green-800"
								: "text-red-800"
						}
					>
						{ticker.todaysChange
							? `$ ${numberToDispaly(ticker.todaysChange)}`
							: "N/A"}
					</TableCell>
					<TableCell
						className={
							ticker.todaysChangePerc && ticker.todaysChangePerc > 0
								? "text-green-800"
								: "text-red-800"
						}
					>
						{ticker.todaysChangePerc
							? `${numberToDispaly(ticker.todaysChangePerc)}%`
							: "N/A"}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default PopularStockSnapShot;
