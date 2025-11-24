import React from "react";
//COMPONENTS
import { Separator } from "@/components/ui/separator";
const HoldingInvestment = ({
	currentPrice,
	quantity,
	buyPrice,
	fxRate,
}: {
	currentPrice: number;
	quantity: number;
	buyPrice: number;
	fxRate: number | null;
}) => {
	return (
		<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
			<span className="text-xl">Your investment</span>
			<div className="flex flex-row justify-between">
				<span>Current value</span>
				<div className="flex flex-col  items-end">
					<span className="font-medium">
						{fxRate
							? `GBP ${(fxRate * currentPrice * quantity).toFixed(2)}`
							: `USD ${(currentPrice * quantity).toFixed(2)}`}
					</span>
					<span className="font-medium text-muted-foreground"></span>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Total quantity</span>
				<span className="font-medium">{quantity}</span>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Cost base</span>
				<span className="font-medium">
					{fxRate
						? `GBP ${(fxRate * currentPrice * quantity).toFixed(2)}`
						: `USD ${(currentPrice * quantity).toFixed(2)}`}
				</span>
			</div>
			<Separator />
			<div className="flex flex-row justify-between">
				<span>Cost base per share</span>
				<span className="font-medium">
					{fxRate
						? `GBP ${(fxRate * buyPrice).toFixed(2)}`
						: `USD ${buyPrice.toFixed(2)}`}
				</span>
			</div>
		</div>
	);
};

export default HoldingInvestment;
