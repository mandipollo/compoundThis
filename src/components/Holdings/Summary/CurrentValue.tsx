import React from "react";
//UI
import { Separator } from "@/components/ui/separator";
//UTILS
import numberToDispaly from "@/utils/numberFormatter";
const HoldingCurrentValue = ({
	price,
	quantity,
	totalReturn,
	percentageReturn,
	fxRate,
}: {
	price: number;
	quantity: number;
	totalReturn: number;
	percentageReturn: number;
	fxRate: number | null;
}) => {
	return (
		<div className="flex flex-col border rounded-md p-4 shadow-md w-md">
			<span className="text-md">Current value</span>
			<span className=" text-lg">USD {(price * quantity).toFixed(2)}</span>
			<span className="text-muted-foreground">
				{fxRate && `GBP ${(price * fxRate * quantity).toFixed(2)}`}
			</span>
			<Separator />
			<div className="flex flex-col gap-2">
				<div className="flex flex-row justify-between items-center">
					<span>${price}</span>
					<span>*</span>
					<span>{quantity}</span>
					<span>=</span>
					<span>USD {(quantity * price).toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
};

export default HoldingCurrentValue;
