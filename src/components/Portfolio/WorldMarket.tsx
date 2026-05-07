import React from "react";
import { Table, TableRow, TableBody, TableCell } from "../ui/table";

const worldMarket = [
	{
		id: 1,
		name: "S&P 500",
		value: 6000,
		dayChange: 60,
		percentageChg: 1.2,
	},
	{
		id: 2,
		name: "DAX",
		value: 4000,
		dayChange: 30,
		percentageChg: 1.2,
	},
	{
		id: 3,
		name: "FTSE 100",
		value: 2330,
		dayChange: 30,
		percentageChg: 1.2,
	},
];
const WorldMarket = () => {
	return (
		<div className=" flex p-4">
			<Table>
				<TableBody>
					{worldMarket.map(invoice => (
						<TableRow key={invoice.id}>
							<TableCell className="font-medium">{invoice.name}</TableCell>
							<TableCell>{invoice.value}</TableCell>
							<TableCell>{invoice.dayChange}</TableCell>
							<TableCell className="text-right">
								{invoice.percentageChg}%
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default WorldMarket;
