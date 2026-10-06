"use client";
import React, { useState } from "react";
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
import TransactionDeleteButton from "./TransactionDeleteButton";
import useTransactions from "@/hooks/swr/holding/useTransaction";
import { useRouter } from "next/navigation";

const HoldingTradesList = ({ ticker }: { ticker: string }) => {
	const router = useRouter();
	// state
	const [isOpenTransactionDeleteDialog, setIsOpenTransactionDeleteDialog] =
		useState<boolean>(false);

	const [selectedTransactionId, setTransactionId] = useState<number | null>(
		null,
	);
	// hooks
	const { data, isLoading, error, mutate } = useTransactions({ ticker });
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}
	if (!data) {
		return;
	}
	const transactionData = data.data;
	const handleTransactionDialogAndId = (id: number) => {
		setTransactionId(id);
		setIsOpenTransactionDeleteDialog(true);
	};
	const handleTransactionDelete = async (id: number | null) => {
		if (id == null) return;
		// optimistic remove transaction from UI
		mutate(
			current =>
				current && { ...current, data: current.data.filter(t => t.id !== id) },
			false,
		);
		console.log(id);
		try {
			const response = await fetch(
				`/api/holding/deleteTransaction?transactionId=${id}&ticker=${ticker}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				},
			);
			const data: {
				data: { message: string; count: number };
				success: boolean;
			} = await response.json();

			if (data.success && data.data.count <= 0) {
				router.push("/portfolio");
			}
			mutate();
		} catch (e) {
			mutate();
			console.log(e);
		}
		setIsOpenTransactionDeleteDialog(false);
	};
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
							<TableCell>{Number(t.price * t.quantity).toFixed(2)}</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="size-8">
											<MoreHorizontalIcon />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem className="text-center">
											Edit
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => handleTransactionDialogAndId(t.id)}
											variant="destructive"
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TransactionDeleteButton
				transactionId={selectedTransactionId}
				handleTransactionDelete={handleTransactionDelete}
				isOpen={isOpenTransactionDeleteDialog}
				onOpenChange={setIsOpenTransactionDeleteDialog}
			/>
		</div>
	);
};

export default HoldingTradesList;
