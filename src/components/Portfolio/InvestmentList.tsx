import Link from "next/link";
//UI
import {
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
	TableFooter,
} from "@/components/ui/table";
//TYPES
import { UserStockDetails } from "@/types/UserPortfolio.type";
const InvestmentList = ({
	stocks,
	currentValue,
}: {
	stocks: UserStockDetails[];
	currentValue: number;
}) => {
	return (
		<Table>
			<TableCaption className="caption-top text-left text-xl text-black">
				Your Investment
			</TableCaption>
			<TableHeader>
				<TableRow className="bg-accent text-xs">
					<TableHead>TICKER</TableHead>
					<TableHead>BPRICE</TableHead>
					<TableHead>PRICE</TableHead>
					<TableHead>QTY</TableHead>
					<TableHead>VALUE</TableHead>
					<TableHead>CAPITAL GAINS</TableHead>
					<TableHead>RETURN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{stocks.map(stock => {
					const price =
						stock.snapshot.day.c === 0
							? stock.snapshot.prevDay.c
							: stock.snapshot.day.c;

					const value = price * stock.quantity;
					const invested = stock.buyPrice * stock.quantity;
					const capitalGains = value - invested;

					const returnPct =
						invested === 0 ? 0 : (capitalGains / invested) * 100;

					return (
						<TableRow key={stock.id}>
							<TableCell className="font-medium underline underline-offset-2">
								<Link href={{ pathname: `/portfolio/${stock.ticker}` }}>
									{stock.ticker}
								</Link>
							</TableCell>
							<TableCell>{stock.buyPrice.toFixed(2)}</TableCell>
							<TableCell>{price.toFixed(2)}</TableCell>
							<TableCell>{stock.quantity}</TableCell>
							<TableCell>{value.toFixed(2)}</TableCell>
							<TableCell
								className={
									capitalGains >= 0 ? "text-green-700" : "text-red-700"
								}
							>
								{capitalGains.toFixed(2)}
							</TableCell>

							<TableCell
								className={returnPct >= 0 ? "text-green-700" : "text-red-700"}
							>
								{returnPct.toFixed(2)}%
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
			<TableFooter className="w-full bg-accent">
				<TableRow className="w-full">
					<TableCell colSpan={6}>Total</TableCell>
					<TableCell>${currentValue.toFixed(2)}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default InvestmentList;
