// ui
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

// types
import { Stock } from "@/types/User.type";

// utils
import numberToDispaly from "@/utils/numberFormatter";

const InvestmentGroup = ({
	stocks,
	totalValue,
}: {
	stocks: Stock[];
	totalValue: number;
}) => {
	return (
		<Table>
			<TableCaption className="caption-top text-left text-xl text-black">
				Your Investment
			</TableCaption>
			<TableHeader>
				<TableRow className="bg-accent text-xs">
					<TableHead>TICKER</TableHead>
					<TableHead>PRICE</TableHead>
					<TableHead>QTY</TableHead>
					<TableHead>VALUE</TableHead>
					<TableHead>CAPITAL GAINS</TableHead>
					<TableHead>DIVIDENDS</TableHead>
					<TableHead>RETURN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{stocks.map(stock => (
					<TableRow key={stock.id}>
						<TableCell className="font-medium">{stock.ticker}</TableCell>
						<TableCell>£{stock.buyPrice}</TableCell>
						<TableCell>{stock.quantity}</TableCell>
						<TableCell>
							£{numberToDispaly(stock.buyPrice * stock.quantity)}
						</TableCell>
						<TableCell>TBD</TableCell>
						<TableCell>TBD</TableCell>
						<TableCell>TBD</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className="w-full bg-accent">
				<TableRow className="w-full">
					<TableCell colSpan={6}>Total</TableCell>
					<TableCell className="">£{totalValue}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default InvestmentGroup;
