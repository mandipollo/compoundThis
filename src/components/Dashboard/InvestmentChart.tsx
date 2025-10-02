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

// Types

import { UserStockDetails } from "@/types/UserPortfolio.type";
// Components
import DemoPortfolioChart from "./DemoPortfolioChart";

// configs
export const description = "A simple area chart";

const InvestmentChart = ({
	currentValue,

	capitalGainPct,
	capitalGains,
}: {
	currentValue: number;

	capitalGains: number;
	capitalGainPct: number;
}) => {
	return (
		<Card>
			<CardContent className="bg-white px-0">
				<DemoPortfolioChart />
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
							<TableCell>£{currentValue.toFixed(2)}</TableCell>
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
