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
import numberToDisplay from "@/utils/numberFormatter";

const Overview = ({
	snapshot,
	ratios,
}: {
	snapshot: TickerSnapshot;
	ratios: Ratios;
}) => {
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
							<span>
								${snapshot.day.o === 0 ? snapshot.prevDay.o : snapshot.day.o}
							</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>High</p>
							<span>
								${snapshot.day.h === 0 ? snapshot.prevDay.h : snapshot.day.h}
							</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Low</p>
							<span>
								${snapshot.day.l === 0 ? snapshot.prevDay.l : snapshot.day.l}
							</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Mkt. cap</p> <span>{numberToDisplay(ratios.market_cap)}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Avg. vol.</p>
							<span>{numberToDisplay(ratios.average_volume)}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between border-b p-1">
							<p>Volume</p>{" "}
							<span>
								{numberToDisplay(
									snapshot.day.v === 0 ? snapshot.prevDay.v : snapshot.day.v,
								)}
							</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/E ratio</p> <span>{ratios.price_to_earnings}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>52 -wk high</p> <span>$983.56</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>52 -wk low</p> <span>$528.72</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>EPS</p> <span>${ratios.earnings_per_share}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between border-b p-1">
							<p>Dividend yield</p> <span>{ratios.dividend_yield}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>Debt/Equity</p> <span>{ratios.debt_to_equity}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/B ratio</p> <span>{ratios.price_to_book}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/CF ratio</p> <span>{ratios.price_to_cash_flow}</span>
						</div>
						<div className="flex justify-between border-b p-1">
							<p>P/FCF ratio</p> <span>{ratios.price_to_free_cash_flow}</span>
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
			<TabsContent value="reports">
				<Card>
					<CardHeader>
						<CardTitle>Reports</CardTitle>
						<CardDescription>
							Generate and download your detailed reports. Export data in
							multiple formats for analysis.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						You have 5 reports ready and available to export.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="settings">
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
						<CardDescription>
							Manage your account preferences and options. Customize your
							experience to fit your needs.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Configure notifications, security, and themes.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default Overview;
