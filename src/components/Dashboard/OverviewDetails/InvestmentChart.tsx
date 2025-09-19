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

// configs
export const description = "A simple area chart";

const InvestmentChart = ({ totalValue }: { totalValue: number }) => {
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
							<TableCell>£100,000</TableCell>
							<TableCell>TBD</TableCell>
							<TableCell>£{totalValue}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">%</TableCell>
							<TableCell>15.12%</TableCell>
							<TableCell>0.76%</TableCell>
							<TableCell>15.88%</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardFooter>
		</Card>
	);
};

export default InvestmentChart;
