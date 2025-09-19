"use client";
import React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import DemoChart from "../../Charts/DemoChart";

import DemoHorizontalChart from "../../Charts/DemoHorizontalChart";
import HoldingSummaryTable from "./HoldingSummaryTable";
import HoldingCurrentValue from "./HoldingCurrentValue";
import HoldingInvestment from "./HoldingInvestment";
import QuoteAbout from "@/components/QuoteSearch/QuoteFundamental/QuoteAbout";
import QuoteDailySummary from "@/components/QuoteSearch/QuoteFundamental/QuoteDailySummary";
const HoldingsSummary = ({ ticker }: { ticker: string }) => {
	if (!ticker) {
		return;
	}
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
