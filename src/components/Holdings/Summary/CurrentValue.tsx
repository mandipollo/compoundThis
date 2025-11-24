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
		<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
			<span className="text-xl">Current value</span>
			<div className="flex flex-row justify-between items-center">
				<span className=" text-lg">USD {price}</span>
				<span>{fxRate && `GBP ${(price * fxRate).toFixed(2)}`}</span>
				<span className="text-muted-foreground">{quantity} shares</span>
			</div>
			<Separator />
			<div className="flex flex-col gap-2">
				<div className="flex flex-row justify-between items-center">
					<span className="text-muted-foreground">Total gain</span>
					<span
						className={`${totalReturn ? "text-green-700" : "text-red-700"}`}
					>
						{fxRate
							? `£ ${(totalReturn * fxRate).toFixed(2)}`
							: `$ ${totalReturn.toFixed(2)}`}
					</span>
					<span
						className={`${totalReturn ? "text-green-700" : "text-red-700"}`}
					>
						{percentageReturn.toFixed(2)}%
					</span>
				</div>
			</div>
		</div>
	);
};

export default HoldingCurrentValue;
