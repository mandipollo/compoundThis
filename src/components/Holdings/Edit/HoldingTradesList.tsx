"use client";
import React from "react";
import { format } from "date-fns";
//UI
import { MoreHorizontalIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import HoldingDestructionButton from "./HoldingDestructionButton";
//Hooks
import useTransaction from "@/hooks/swr/holding/useTransaction";

const HoldingTradesList = ({ ticker }: { ticker: string }) => {
	const { data, isLoading, error } = useTransaction({ ticker });
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}
	const transactionData = data.data;
	return (
		<div>
			<div className="flex w-full items-end justify-end">
				<HoldingDestructionButton ticker={ticker} />
			</div>
			<Table>
				<TableCaption className="caption-top text-left text-xl text-foreground">
					<p>All Transactions</p>
				</TableCaption>

				<TableHeader>
					<TableRow className="bg-accent">
						<TableHead>Date</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Exchange rate</TableHead>
						<TableHead>Values</TableHead>
						<TableHead></TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactionData.map(t => (
						<TableRow key={t.id}>
							<TableCell>{format(t.date, "d LLL yyyy")}</TableCell>
							<TableCell>{t.transactionType}</TableCell>
							<TableCell>{t.quantity}</TableCell>
							<TableCell>{t.price}</TableCell>
							<TableCell></TableCell>
							<TableCell>{(t.price * t.quantity).toFixed(2)}</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="size-8">
											<MoreHorizontalIcon />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem variant="destructive">
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default HoldingTradesList;
