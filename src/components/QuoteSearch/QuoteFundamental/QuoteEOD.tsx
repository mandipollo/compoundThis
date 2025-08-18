import { Separator } from "@/components/ui/separator";
import useQuoteFundamental from "@/hooks/swr/useQuoteFundamental";
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";
import React from "react";

const QuoteEOD = () => {
	const { selectedQuote } = useSelectedQuoteStore();

	if (!selectedQuote) {
		return;
	}
	const { error, isLoading, data } = useQuoteFundamental(`${selectedQuote}`);
	console.log(data);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	return (
		<div className=" border rounded-md shadow-md ">
			<ul className="flex flex-col p-4 text-xs gap-4">
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">PREVIOUS CLOSE</span>
					<span>${data.data.close}</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">DAY RANGE</span>
					<span>
						${data.data.low} - ${data.data.high}
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
					<span>{data.data.marketCap} USD</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">AVG VOLUME</span>
					<span>{data.data.volume}</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">P/E RATIO</span>
					<span>{data.data.peRatio}</span>
				</li>
				<Separator />
				<li className="flex flex-row justify-between items-center ">
					<span className="text-muted-foreground">DIVIDEND</span>
					<span>{data.data.divCash}</span>
				</li>
				<Separator />
			</ul>
		</div>
	);
};

export default QuoteEOD;
