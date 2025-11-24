"use client";
//UI
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
//CONFIGS
export const description = "A simple area chart";
const InvestmentSummary = ({
	capitalGainPct,
	capitalGains,
	fxRate,
}: {
	capitalGains: number;
	capitalGainPct: number;
	fxRate: number | null;
}) => {
	return (
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
						className={capitalGains >= 0 ? "text-green-700" : "text-red-700"}
					>
						{fxRate
							? `GBP ${(capitalGains * fxRate).toFixed(2)}`
							: `USD ${capitalGains}`}
					</TableCell>
					<TableCell>TBD</TableCell>
					<TableCell
						className={capitalGains >= 0 ? "text-green-700" : "text-red-700"}
					>
						{fxRate
							? `GBP ${(capitalGains * fxRate).toFixed(2)}`
							: `USD ${capitalGains}`}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">%</TableCell>
					<TableCell
						className={capitalGainPct >= 0 ? "text-green-700" : "text-red-700"}
					>
						{capitalGainPct.toFixed(2)}%
					</TableCell>
					<TableCell>TBD</TableCell>
					<TableCell
						className={capitalGainPct >= 0 ? "text-green-700" : "text-red-700"}
					>
						{capitalGainPct.toFixed(2)}%
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default InvestmentSummary;
