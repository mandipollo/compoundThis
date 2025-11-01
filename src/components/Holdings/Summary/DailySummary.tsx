"use client";
import React from "react";

//UI
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
//HOOKS
import useQuoteDailySummary from "@/hooks/swr/holding/useSummary";
const HoldingDailySummary = ({ selectedQuote }: { selectedQuote: string }) => {
	if (!selectedQuote) {
		return;
	}
	const { data, error, isLoading } = useQuoteDailySummary(selectedQuote);

	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className=" border rounded-md shadow-md ">
			<ul className="flex flex-col p-4 text-xs gap-4">
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">PREVIOUS CLOSE</span>
					<span>${data?.data?.close ?? "N/A"}</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">OPEN</span>
					<span>${data?.data?.open ?? "N/A"}</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">DAY RANGE</span>
					<span>
						${data?.data?.low ?? "N/A"} - ${data?.data?.high ?? "N/A"}
					</span>
				</li>
				<Separator />

				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">VOLUME</span>
					<span>{data?.data?.volume ?? "N/A"}</span>
				</li>
				<Separator />
			</ul>
		</div>
	);
};

export default HoldingDailySummary;
