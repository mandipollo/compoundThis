import React from "react";
//UI
import { Separator } from "@/components/ui/separator";
//UTILS
import numberToDispaly from "@/utils/numberFormatter";
const HoldingCurrentValue = ({
	price,
	quantity,
	dailyPrice,
}: {
	price: number;
	quantity: number;
	dailyPrice: number;
}) => {
	return (
		<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
			<span className="text-xl">Current value</span>
			<div className="flex flex-row justify-between items-center">
				<span className=" text-lg">GB£</span>
				<span>US${dailyPrice.toFixed(2)}</span>
				<span className="text-muted-foreground">{quantity} shares</span>
			</div>
			<Separator />
			<div className="flex flex-col gap-2">
				<div className="flex flex-row justify-between items-center">
					<span className="text-muted-foreground">Total gain</span>
					<span
						className={`${dailyPrice < price ? "text-red-700" : "text-green-700"}`}
					>
						${(dailyPrice - price).toFixed(2)}
					</span>
					<span
						className={`${dailyPrice < price ? "text-red-700" : "text-green-700"}`}
					>
						{numberToDispaly(((dailyPrice - price) / price) * 100)}%
					</span>
				</div>
			</div>
		</div>
	);
};

export default HoldingCurrentValue;
