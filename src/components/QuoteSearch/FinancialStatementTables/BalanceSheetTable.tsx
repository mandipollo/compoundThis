import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import numberToDispaly from "@/utils/numberFormatter";

import React from "react";
import { BalanceSheetInterface } from "./FinancialAccordion";

const BalanceSheetTable = ({
	balanceSheet,
}: {
	balanceSheet: BalanceSheetInterface[];
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>(USD)</TableHead>
					<TableHead className="text-right">{balanceSheet[0].date}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{balanceSheet[0].balanceSheet.map(data => (
					<TableRow key={data.dataCode}>
						<TableCell>
							{data.dataCode[0].toUpperCase() + data.dataCode.slice(1)}
						</TableCell>
						<TableCell className="text-right">
							{numberToDispaly(data.value)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BalanceSheetTable;
