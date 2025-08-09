import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ChartAreaDefault } from "../Home/ChartHome";

const OverviewDetails = () => {
	return (
		<section className="grid gap-2 grid-cols-[2fr_1fr]">
			<Card className="bg-white border rounded-md p-4 shadow-md">
				<CardHeader>
					<CardTitle className="font-light ">Investment Statistic</CardTitle>
					<CardDescription>
						Revealing risks and growths in investment
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartAreaDefault />
				</CardContent>
			</Card>
			<Card className=" border rounded-md p-4 gap-4 shadow-md">
				<CardHeader>
					<CardTitle className="font-light ">Invesment Details</CardTitle>
					<CardDescription>Assets you have in your account</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="w-full flex flex-col gap-2 list-disc  ">
						<li className="flex flex-row justify-between items-center">
							<p>Stocks</p>
							<span>£42,000</span>
							<span className="text-white bg-red-400 p-2 w-10 rounded-md">
								43%
							</span>
						</li>
						<li className="flex flex-row justify-between items-center">
							<p>ETF&apos;S</p>
							<span>£12,000</span>
							<span className="text-white bg-green-400 p-2 w-10 rounded-md">
								23%
							</span>
						</li>
						<li className="flex flex-row justify-between items-center">
							<p>Bond</p>
							<span>£12,000</span>
							<span className="text-white bg-violet-400 p-2 w-10 rounded-md">
								13%
							</span>
						</li>
						<li className="flex flex-row justify-between items-center">
							<p>MMF</p>
							<span>£2,000</span>
							<span className="text-white bg-blue-400 p-2 w-10 rounded-md">
								3%
							</span>
						</li>
					</ul>
				</CardContent>
			</Card>
		</section>
	);
};

export default OverviewDetails;
