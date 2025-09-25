"use client";

// ui

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DemoChart from "@/components/Charts/DemoChart";
import { UserStockDetails } from "@/types/UserPortfolio.type";
import numberToDispaly from "@/utils/numberFormatter";

// configs
export const description = "A simple area chart";

const InvestmentChart = ({ stocks }: { stocks: UserStockDetails[] }) => {
	const totalValue = stocks.reduce(
		(acc, stock) =>
			acc +
			stock.quantity *
				(stock.snapshot.day.c === 0
					? stock.snapshot.prevDay.c
					: stock.snapshot.day.c),
		0
	);
	const initialInvestment = stocks.reduce(
		(acc, stock) => acc + stock.buyPrice * stock.quantity,
		0
	);
	const capitalGains = totalValue - initialInvestment;
	const capitalGainPct =
		initialInvestment === 0 ? 0 : (capitalGains / initialInvestment) * 100;
	return (
		<Card>
			<CardContent className="bg-white px-0">
				<DemoChart />
			</CardContent>
			<CardFooter className="bg-white text-black px-0">
				<Table>
					<TableHeader>
						<TableRow className="bg-accent text-xs">
							<TableHead>SUMMARY</TableHead>
							<TableHead>CAPITAL GAIN</TableHead>
							<TableHead>DIVIDENDS</TableHead>
							<TableHead>TOTAL RETURN</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Your portfolio</TableCell>
							<TableCell
								className={
									capitalGains >= 0 ? "text-green-700" : "text-red-700"
								}
							>
								£{capitalGains.toFixed(2)}
							</TableCell>
							<TableCell>TBD</TableCell>
							<TableCell>£{totalValue.toFixed(2)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">%</TableCell>
							<TableCell
								className={
									capitalGainPct >= 0 ? "text-green-700" : "text-red-700"
								}
							>
								{capitalGainPct.toFixed(2)}%
							</TableCell>
							<TableCell>TBD</TableCell>
							<TableCell
								className={
									capitalGainPct >= 0 ? "text-green-700" : "text-red-700"
								}
							>
								{capitalGainPct.toFixed(2)}%
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardFooter>
		</Card>
	);
};

export default InvestmentChart;
