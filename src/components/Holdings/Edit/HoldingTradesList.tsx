"use client";

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
import useTransaction from "@/hooks/swr/holding/useTransaction";
import { format } from "date-fns";

const HoldingTradesList = ({ ticker }: { ticker: string }) => {
	const { data, isLoading, error } = useTransaction({ ticker: ticker });
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	const transactionData = data.data;
	console.log(transactionData);
	return (
		<div>
			<Table>
				<TableCaption className="caption-top text-left text-xl text-foreground">
					All transactions
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
					{transactionData.map(t => (
						<TableRow key={t.id}>
							<TableCell>{format(t.date, "MM/dd/yyyy")}</TableCell>
							<TableCell>{t.transactionType}</TableCell>
							<TableCell>{t.quantity}</TableCell>
							<TableCell>{t.price}</TableCell>
							<TableCell>{t.price * t.quantity}</TableCell>
							<TableCell className="text-blue-700 underline underline-offset-2">
								Edit
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default HoldingTradesList;
