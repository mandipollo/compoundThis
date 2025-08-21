"use client";
import React, { useEffect, useState } from "react";
import { Gradient } from "./gradient";
import {
	TableCaption,
	TableRow,
	TableBody,
	TableCell,
	Table,
} from "../ui/table";
import { io } from "socket.io-client";
import { set } from "zod";
const PopularStocks = () => {
	// connect to io
	const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

	const [popularStocks, setPopularStocks] = useState<{}[]>([]);
	useEffect(() => {
		const socket = io(server);

		socket.on("popularStocks", data => {
			const dataStream = data.toString();

			setPopularStocks(dataStream);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<section className="flex relative justify-center items-center w-full h-full bg-primary p-2 py-20">
			<div className="relative flex max-w-4xl w-full h-72 ">
				{/* Canvas for the gradient background */}

				<div className="flex justify-center items-center w-full px-48 font-extralight">
					<Table>
						<TableCaption className="text-xl text-black ">
							Popular Stocks
						</TableCaption>

						<TableBody>
							<TableRow className="text-center">
								<TableCell>MSFT</TableCell>
								<TableCell>$ 238</TableCell>
								<TableCell>$ 19</TableCell>
								<TableCell className="text-green-600">9%</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
};

export default PopularStocks;
