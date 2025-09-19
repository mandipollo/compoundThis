import { Separator } from "@/components/ui/separator";
import React from "react";

const HoldingCurrentValue = () => {
	return (
		<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
			<div className="flex flex-row justify-between items-center">
				<span className=" text-xl">GB£176.28</span>
				<span>US$237.28</span>
				<span className="text-muted-foreground">20 shares</span>
			</div>
			<Separator />
			<div className="flex flex-col gap-2">
				<div className="flex flex-row justify-between items-center">
					<span className="text-muted-foreground">Day gain</span>
					<span className="text-green-700">£50.00</span>
					<span className="text-green-700">1.00%</span>
				</div>
				<div className="flex flex-row justify-between items-center">
					<span className="text-muted-foreground">Total gain</span>
					<span className="text-green-700">£1250.80</span>
					<span className="text-green-700">41.00%</span>
				</div>
			</div>
		</div>
	);
};

export default HoldingCurrentValue;
