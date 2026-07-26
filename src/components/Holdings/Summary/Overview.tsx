import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ratios } from "@/types/Ratios.type";
import { TickerSnapshot } from "@/types/TickerSnapshot.type";
import { YearOHLC } from "@/types/YearOHLC.type";
import numberToDisplay from "@/utils/numberFormatter";

const Overview = ({
	snapshot,
	ratios,
	yearOHLC,
}: {
	snapshot: TickerSnapshot;
	ratios: Ratios;
	yearOHLC: YearOHLC;
}) => {
	const openPrice = snapshot.day.o === 0 ? snapshot.prevDay.o : snapshot.day.o;
	const highPrice = snapshot.day.h === 0 ? snapshot.prevDay.h : snapshot.day.h;
	const lowPrice = snapshot.day.l === 0 ? snapshot.prevDay.l : snapshot.day.l;
	const currentVolume =
		snapshot.day.v === 0 ? snapshot.prevDay.v : snapshot.day.v;
	return (
		<Tabs defaultValue="overview" className="w-full">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<div className="grid grid-cols-3 gap-4 border-t p-2">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between p-1 border-b">
							<p>Open</p>
							<span>${openPrice}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>High</p>
							<span>${highPrice}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Low</p>
							<span>${lowPrice}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Mkt. cap</p>
							<span>{numberToDisplay(ratios?.market_cap ?? 0)}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Avg. vol.</p>
							<span>{numberToDisplay(ratios?.average_volume) ?? 0}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between border-b p-1">
							<p>Volume</p>
							<span>{numberToDisplay(currentVolume)}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/E ratio</p> <span>{ratios?.price_to_earnings ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>52 -wk high</p> <span>${yearOHLC?.h ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>52 -wk low</p> <span>${yearOHLC?.l ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>EPS</p> <span>${ratios?.earnings_per_share ?? "N/A"}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between border-b p-1">
							<p>Dividend yield</p>
							<span>{ratios?.dividend_yield ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Debt/Equity</p> <span>{ratios?.debt_to_equity ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/B ratio</p> <span>{ratios?.price_to_book ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/CF ratio</p>
							<span>{ratios?.price_to_cash_flow ?? "N/A"}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/FCF ratio</p>
							<span>{ratios?.price_to_free_cash_flow ?? "N/A"}</span>
						</div>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="analytics">
				<Card>
					<CardHeader>
						<CardTitle>Analytics</CardTitle>
						<CardDescription>
							Track performance and user engagement metrics. Monitor trends and
							identify growth opportunities.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Page views are up 25% compared to last month.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default Overview;
