"use client";
import React, { useEffect, useState } from "react";
import {
	TableCaption,
	TableRow,
	TableBody,
	TableCell,
	Table,
} from "../ui/table";
import { io } from "socket.io-client";
import Container from "../Containers/Container";
const PopularStocks = () => {
	// connect to io
	const server = process.env.LOCAL_BASE_SERVER;

	// const [popularStocks, setPopularStocks] = useState<{}[]>([]);
	// useEffect(() => {
	// 	const socket = io(server);
	// 	socket.on("homepage", data => {
	// 		console.log(data);
	// 	});

	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, []);

	return (
		<section className="flex justify-center items-center w-full h-full bg-primary">
			<Container>
				<div className=" flex py-10 w-full h-full ">
					<div className="flex justify-center items-center bg-white rounded-4xl p-10 h-full w-full font-extralight">
						<Table className="w-full">
							<TableCaption className="text-xl font-md text-black ">
								Popular Stocks
							</TableCaption>

							<TableBody>
								<TableRow className="text-center">
									<TableCell>MSFT</TableCell>
									<TableCell>$ 238</TableCell>
									<TableCell>$ 19</TableCell>
									<TableCell className="text-green-600">9%</TableCell>
								</TableRow>
								<TableRow className="text-center">
									<TableCell>AAPL</TableCell>
									<TableCell>$ 238</TableCell>
									<TableCell>$ 19</TableCell>
									<TableCell className="text-green-600">9%</TableCell>
								</TableRow>
								<TableRow className="text-center">
									<TableCell>AMD</TableCell>
									<TableCell>$ 238</TableCell>
									<TableCell>$ 19</TableCell>
									<TableCell className="text-green-600">9%</TableCell>
								</TableRow>
								<TableRow className="text-center">
									<TableCell>TSLA</TableCell>
									<TableCell>$ 238</TableCell>
									<TableCell>$ 19</TableCell>
									<TableCell className="text-green-600">9%</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PopularStocks;
