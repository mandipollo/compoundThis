import { Separator } from "@/components/ui/separator";
import React from "react";

const HoldingInvestment = () => {
	return (
		<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
			<span className="text-xl">Your investment</span>
			<div className="flex flex-row justify-between">
				<span>Current value</span>
				<div className="flex flex-col  items-end">
					<span className="font-medium">US$119,246.86</span>
					<span className="font-medium text-muted-foreground">
						GB£88,467.68
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Total quantity</span>
				<span className="font-medium">493</span>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Cost base</span>
				<span className="font-medium">GB£9,623.42</span>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Cost base per share</span>
				<span className="font-medium">GB£18.78</span>
			</div>
		</div>
	);
};

export default HoldingInvestment;
