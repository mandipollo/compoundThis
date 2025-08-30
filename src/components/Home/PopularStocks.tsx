"use client";

import React from "react";

// ui
import {
	TableCaption,
	TableRow,
	TableBody,
	TableCell,
	Table,
} from "../ui/table";
import Container from "../Containers/Container";

// websockets
import { io } from "socket.io-client";

// hooks
import useMarketStatus from "@/hooks/swr/useMarketStatus";
const PopularStocks = () => {
	// connect to io
	const server = process.env.LOCAL_BASE_SERVER;

	// check market status

	const { data, isLoading, error } = useMarketStatus();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	// caption

	const renderCaption = () => {
		if (!data.data) <p>Loading...</p>;
		if (data.data?.market === "extended-hours") {
			return data.data.earlyHours ? "Pre-Market" : "After-Hours";
		}
		return data.data?.market;
	};
	console.log(data);

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
							<TableCaption className="text-xl font-md text-black caption-top">
								Market is currently {renderCaption()}
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
