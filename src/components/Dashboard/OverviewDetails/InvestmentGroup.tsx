import React from "react";
import {
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
	TableFooter,
} from "@/components/ui/table";

const InvestmentGroup = () => {
	return (
		<Table>
			<TableCaption className="caption-top text-left text-xl text-black">
				Your Investment
			</TableCaption>
			<TableHeader>
				<TableRow className="bg-accent text-xs">
					<TableHead>LSE</TableHead>
					<TableHead>PRICE</TableHead>
					<TableHead>QTY</TableHead>
					<TableHead>VALUE</TableHead>
					<TableHead>CAPITAL GAINS</TableHead>
					<TableHead>DIVIDENDS</TableHead>
					<TableHead>RETURN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">VUAG.LSE</TableCell>
					<TableCell>£43.329</TableCell>
					<TableCell>7000</TableCell>
					<TableCell>303,303</TableCell>
					<TableCell>10,000</TableCell>
					<TableCell>0.00</TableCell>
					<TableCell>10,000</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">VEUA.LSE</TableCell>
					<TableCell>£92.636</TableCell>
					<TableCell>5000</TableCell>
					<TableCell>463180</TableCell>
					<TableCell>50,000</TableCell>
					<TableCell>0.00</TableCell>
					<TableCell>50,000</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter className="w-full bg-accent">
				<TableRow className="w-full">
					<TableCell colSpan={6}>Total</TableCell>
					<TableCell className="">£660,649.87</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default InvestmentGroup;
