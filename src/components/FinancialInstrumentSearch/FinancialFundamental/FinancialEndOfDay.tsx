import { Separator } from "@/components/ui/separator";
import React from "react";

type FinancialEndOfDayProps = {
	close?: number;
	high?: number;
	low?: number;
	marketCap?: number;
	volume?: number;
	peRatio?: number;
	pbRation?: number;
	trailingPeg?: number;
	date?: string;
	divCash?: number;
};

const FinancialEndOfDay: React.FC<FinancialEndOfDayProps> = ({
	close,
	high,
	low,
	marketCap,
	volume,
	peRatio,
	pbRation,
	trailingPeg,
	date,
	divCash,
}) => {
	return (
		<ul className="flex flex-col p-4 text-xs gap-4">
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">PREVIOUS CLOSE</span>
				<span>${close}</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">DAY RANGE</span>
				<span>
					${low} - ${high}
				</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">YEAR RANGE</span>
				<span>$210 - $890</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">MARKET CAP</span>
				<span>{marketCap} USD</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">AVG VOLUME</span>
				<span>{volume}</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">P/E RATIO</span>
				<span>{peRatio}</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center ">
				<span className="text-muted-foreground">DIVIDEND</span>
				<span>{divCash}</span>
			</li>
			<Separator />
			<li className="flex flex-row justify-between items-center">
				<span className="text-muted-foreground">PRIMARY EXCHANGE</span>
				<span>NASDAQ</span>
			</li>
		</ul>
	);
};

export default FinancialEndOfDay;
