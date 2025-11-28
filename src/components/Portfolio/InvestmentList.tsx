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
import { UserStock } from "@/types/UserPortfolio.type";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
const InvestmentList = ({
	stocks,
	currentValue,
	fxRate,
}: {
	stocks: UserStock[];
	currentValue: number;
	fxRate: number | null;
}) => {
	return (
		<Table>
			<TableCaption className="caption-top text-left text-xl text-black">
				Your Investment
			</TableCaption>
			<TableHeader>
				<TableRow className="bg-accent text-xs">
					<TableHead>TICKER</TableHead>
					<TableHead className="text-right flex items-center justify-end">
						<Tooltip>
							<TooltipTrigger className="flex flex-row gap-2 items-end justify-end">
								P PRICE{" "}
								<Image
									src={"/question.svg"}
									width={15}
									height={15}
									alt="Tooltip"
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Purchase price</p>
							</TooltipContent>
						</Tooltip>
					</TableHead>
					<TableHead className="text-right">PRICE</TableHead>
					<TableHead className="text-right">QTY</TableHead>
					<TableHead className="text-right">VALUE</TableHead>
					<TableHead className="text-right">GAIN/LOSS</TableHead>
					<TableHead className="text-right">RETURN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{stocks.map(stock => {
					const value = stock.snapshot.close * stock.quantity;
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
							<TableCell className="text-right">
								{stock.buyPrice.toFixed(2)}
							</TableCell>
							<TableCell className="text-right">
								$ {stock.snapshot.close.toFixed(2)}
							</TableCell>
							<TableCell className="text-right">{stock.quantity}</TableCell>
							<TableCell className="text-right"> {value.toFixed(2)}</TableCell>
							<TableCell
								className={`
									${capitalGains >= 0 ? "text-green-700" : "text-red-700"} text-right`}
							>
								{capitalGains.toFixed(2)}
							</TableCell>

							<TableCell
								className={`${returnPct >= 0 ? "text-green-700" : "text-red-700"} text-right`}
							>
								{returnPct.toFixed(2)}%
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
			<TableFooter className="w-full bg-accent">
				<TableRow className="">
					<TableCell colSpan={6}></TableCell>
					<TableCell className="text-right">
						$ {currentValue.toFixed(2)}
					</TableCell>
				</TableRow>
				<TableRow className="w-full">
					<TableCell colSpan={6}>Total</TableCell>
					<TableCell className="text-right">
						{fxRate
							? `£ ${(currentValue * fxRate).toFixed(2)}`
							: `$ ${currentValue.toFixed(2)}`}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default InvestmentList;
