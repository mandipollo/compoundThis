import {
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialog,
} from "@/components/ui/alert-dialog";
import React from "react";

interface DeleteButtonProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	transactionId: number | null;
	handleTransactionDelete: (id: number | null) => void;
}
const TransactionDeleteButton = ({
	isOpen,
	onOpenChange,
	handleTransactionDelete,
	transactionId,
}: DeleteButtonProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent className="bg-accent">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Holding</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this transaction? You cannot undo
						this action
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={() => handleTransactionDelete(transactionId)}
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

export default TransactionDeleteButton;
