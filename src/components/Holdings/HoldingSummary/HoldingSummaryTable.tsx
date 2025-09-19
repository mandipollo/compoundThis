import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React from "react";

const HoldingSummaryTable = () => {
	return (
		<Table>
			<TableCaption className=" caption-top text-left px-2">
				Summary
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="font-light">Total return</TableHead>
					<TableHead className="font-light">Capital gain</TableHead>
					<TableHead className="font-light">Dividends</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-semibold">94.03%</TableCell>
					<TableCell className="font-semibold">93.70%</TableCell>
					<TableCell className="font-semibold">0.00%</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="text-xs">GB£85.37</TableCell>
					<TableCell className="text-xs">GB£85.07</TableCell>
					<TableCell className="text-xs">GB£0.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default HoldingSummaryTable;
