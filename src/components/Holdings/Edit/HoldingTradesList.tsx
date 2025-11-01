import React from "react";
//UI
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const HoldingTradesList = ({ ticker }: { ticker: string }) => {
	return (
		<div>
			<Table>
				<TableCaption className="caption-top text-left text-xl text-foreground">
					All trades
				</TableCaption>
				<TableHeader>
					<TableRow className="bg-accent">
						<TableHead>Date</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Values</TableHead>
						<TableHead>Status</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">20 Sep 2025</TableCell>
						<TableCell>Buy</TableCell>
						<TableCell>12</TableCell>
						<TableCell>GB£3.21</TableCell>
						<TableCell>GB£32.21</TableCell>
						<TableCell>Confirmed</TableCell>
						<TableCell className="text-blue-700 underline underline-offset-2">
							Edit
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default HoldingTradesList;
