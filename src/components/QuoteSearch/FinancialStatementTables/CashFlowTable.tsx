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
import { CashFlowInterface } from "./FinancialAccordion";

const CashFlowTable = ({ cashFlow }: { cashFlow: CashFlowInterface[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>(USD)</TableHead>
					<TableHead className="text-right">{cashFlow[0].date}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{cashFlow[0].cashFlow.map(data => (
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

export default CashFlowTable;
