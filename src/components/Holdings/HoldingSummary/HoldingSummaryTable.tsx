import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import React from "react";

const HoldingSummaryTable = ({
	buyDate,
	purchasePrice,
	dailyPrice,
}: {
	buyDate: string;
	purchasePrice: number;
	dailyPrice: number;
}) => {
	return (
		<Table>
			<TableCaption className=" caption-top text-left px-2">
				Summary - first purchase since {format(buyDate, "dd/MM/yyyy")}
			</TableCaption>
			<TableHeader>
				<TableRow className="bg-accent">
					<TableHead className="font-light">Total return</TableHead>
					<TableHead className="font-light">Capital gain</TableHead>
					<TableHead className="font-light">Dividends</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell
						className={`${dailyPrice < purchasePrice ? "text-red-700" : "text-green-700"} font-semibold `}
					>
						{(((dailyPrice - purchasePrice) / purchasePrice) * 100).toFixed(2)}%
					</TableCell>
					<TableCell
						className={`${dailyPrice < purchasePrice ? "text-red-700" : "text-green-700"} font-semibold `}
					>
						{(((dailyPrice - purchasePrice) / purchasePrice) * 100).toFixed(2)}%
					</TableCell>
					<TableCell className="font-semibold">0.00%</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						className={`${dailyPrice < purchasePrice ? "text-red-700" : "text-green-700"} text-xs `}
					>
						GB£ {dailyPrice - purchasePrice}
					</TableCell>
					<TableCell
						className={`${dailyPrice < purchasePrice ? "text-red-700" : "text-green-700"} text-xs `}
					>
						GB£ {dailyPrice - purchasePrice}
					</TableCell>
					<TableCell className="text-xs">GB£0.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default HoldingSummaryTable;
