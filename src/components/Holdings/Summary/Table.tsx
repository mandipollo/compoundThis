import { format } from "date-fns";
import React from "react";
//COMPONENTS
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
const HoldingSummaryTable = ({
	buyDate,
	percentageReturn,
	totalReturn,
	fxRate,
	localCurrencyPrice,
	localCurrencyReturn,
}: {
	buyDate: string;
	percentageReturn: number;
	totalReturn: number;
	fxRate: number | null;
	localCurrencyPrice: number | null;
	localCurrencyReturn: number | null;
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
						className={`${percentageReturn ? "text-green-700" : "text-red-700"} font-semibold `}
					>
						{percentageReturn.toFixed(2)}
					</TableCell>
					<TableCell
						className={`${percentageReturn ? "text-green-700" : "text-red-700"} font-semibold `}
					>
						{percentageReturn.toFixed(2)}
					</TableCell>
					<TableCell className="font-semibold">TBD</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						className={`${totalReturn ? "text-green-700" : "text-red-700"} text-xs `}
					>
						{localCurrencyReturn
							? `£${localCurrencyReturn.toFixed(2)}`
							: `$${totalReturn.toFixed(2)}`}
					</TableCell>
					<TableCell
						className={`${totalReturn ? "text-green-700" : "text-red-700"} text-xs `}
					>
						{localCurrencyReturn
							? `£${localCurrencyReturn.toFixed(2)}`
							: `$${totalReturn.toFixed(2)}`}
					</TableCell>
					<TableCell className="text-xs">TBD</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default HoldingSummaryTable;
