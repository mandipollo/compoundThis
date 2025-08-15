"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

const instrument = [
	{
		logo: "/apple.svg",
		price: "£212.09",
		company: "Apple Inc",
		ticker: "AAPL",
	},
	{
		logo: "/tesla.svg",

		price: "£303",
		company: "Tesla",
		ticker: "TSLA",
	},
	{
		logo: "/amd.svg",

		price: "£143.19",
		company: "AMD",
		ticker: "AMD",
	},
	{
		logo: "/blackberry.svg",

		price: "£4.15",
		company: "Blackberry",
		ticker: "BB",
	},
	{
		logo: "/meta.svg",

		price: "£726.02",
		company: "Meta Inc",
		ticker: "META",
	},
];

const Watchlist = () => {
	return (
		<div className="bg-white border rounded-md flex flex-1 p-4 flex-col shadow-md">
			<h2 className="text-xl">Your Watchlist</h2>
			<Table>
				<TableBody>
					{instrument.map((instrument, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">
								<figure>
									<Image
										src={instrument.logo}
										width={30}
										height={30}
										alt={instrument.ticker}
									/>
								</figure>
							</TableCell>
							<TableCell>{instrument.ticker}</TableCell>
							<TableCell>{instrument.company}</TableCell>
							<TableCell className="text-right">{instrument.price}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Watchlist;
