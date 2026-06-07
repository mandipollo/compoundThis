import {
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialog,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const HoldingDestructionButton = ({ ticker }: { ticker: string }) => {
	const route = useRouter();

	console.log(ticker);

	const deleteHoldingTransactionHandler = async () => {
		try {
			const response = await fetch(`/api/holding/delete?ticker=${ticker}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			console.log(data);
			if (data.success) {
				route.push("/portfolio");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="text-xs">
					Delete This Holding
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-accent">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Holding</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this holding? You cannot undo this
						action
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={deleteHoldingTransactionHandler}
						variant="destructive"
					>
						Delete
					</AlertDialogAction>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default HoldingDestructionButton;
