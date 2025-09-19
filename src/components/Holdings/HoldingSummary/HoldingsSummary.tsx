"use client";

import React from "react";

// ui
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// components
import DemoChart from "../../Charts/DemoChart";
import DemoHorizontalChart from "../../Charts/DemoHorizontalChart";
import HoldingSummaryTable from "./HoldingSummaryTable";
import HoldingCurrentValue from "./HoldingCurrentValue";
import HoldingInvestment from "./HoldingInvestment";

//Hooks
import useIndividualStockPortfolio from "@/hooks/swr/useIndividualStockPortfolio";
import { Loader2Icon } from "lucide-react";

const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}

	const {
		error,
		data,
		isLoading,
	}: { error: string; data: any; isLoading: boolean } =
		useIndividualStockPortfolio({ ticker });

	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error) {
		return <div>{error}</div>;
	}
	console.log(data);

	return (
		<div className="flex flex-col w-full gap-2 h-full ">
			<div className="grid w-full gap-2 grid-cols-[2fr_1fr]">
				<div className="flex flex-col gap-4">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Timespan" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="first">Since first purchase</SelectItem>
							<SelectItem value="month">In this month</SelectItem>
							<SelectItem value="week">In last week</SelectItem>
						</SelectContent>
					</Select>

					<HoldingSummaryTable />
					<DemoChart />
				</div>
				<div className="flex flex-col gap-2">
					<HoldingCurrentValue />
					<div className="flex flex-col gap-2 border rounded-md p-4 shadow-md">
						<DemoHorizontalChart />
					</div>
					<HoldingInvestment />
				</div>
			</div>
			<div className="flex flex-1 items-center justify-center rounded-md border shadow-md ">
				<span className="text-xl">AI feature to be added </span>
			</div>
		</div>
	);
};

export default HoldingsSummary;
