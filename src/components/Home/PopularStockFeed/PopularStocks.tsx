"use client";

import React, { useEffect, useState } from "react";

// ui
import { TableCaption, Table } from "../../ui/table";
import Container from "../../Containers/Container";

// websockets
import { io } from "socket.io-client";

// hooks
import useMarketStatus from "@/hooks/swr/useMarketStatus";
import usePopularStocks from "@/hooks/swr/usePopularStocks";
import { useHomeSelectedQuoteStore } from "@/store/homeSelectedQuoteStore";
// utils

import { WebSocketPopularStockData } from "@/types/Stock.type";

// components
import PopularStockLiveData from "./PopularStockLiveData";
import PopularStockSnapShot from "./PopularStockSnapShot";
import LoadingStockData from "./LoadingStockData";
import ErrorStock from "./ErrorStock";

const PopularStocks = () => {
	//
	const { clearSelectedQuote } = useHomeSelectedQuoteStore();

	useEffect(() => {
		return () => {
			clearSelectedQuote();
		};
	}, []);
	// connect to io
	const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

	// check market status

	const {
		data: marketStatus,
		isLoading: marketIsLoading,
		error: marketError,
	} = useMarketStatus();

	// snapshot of the stocks

	const {
		data: snapshotData,
		isLoading: snapshotIsLoading,
		error: snapshotError,
	} = usePopularStocks();

	// conditionally join socket if the market is open

	// since polygon ws sends data for each stock individually , we need to store the data in a object with ticker key and update only the values that has changed
	const [wsStockData, setWsStockData] = useState<
		Record<string, WebSocketPopularStockData>
	>({});

	useEffect(() => {
		if (!marketStatus) return;
		const market = marketStatus.data.market;

		const isOpen = ["extended-hours", "open"].includes(market);

		if (isOpen) {
			const socket = io(server);

			socket.on("connect", () => {
				console.log(socket.id);
			});
			socket.on("popularStocks", (data: WebSocketPopularStockData[]) => {
				setWsStockData(prev => {
					const next = { ...prev };

					data.forEach(update => {
						next[update.sym] = update;
					});
					return next;
				});
			});

			return () => {
				socket.disconnect();
			};
		}
	}, [server, marketStatus?.data?.market]);

	if (marketIsLoading || snapshotIsLoading) {
		return <LoadingStockData />;
	}

	if (marketError || snapshotError) {
		return <ErrorStock />;
	}

	return (
		<section className="flex justify-center items-center w-full h-full bg-primary">
			<Container>
				<div className=" flex py-10 w-full h-full ">
					<div className="flex justify-center items-center bg-white rounded-4xl p-10 h-full w-full font-extralight">
						<Table className="w-full">
							<TableCaption className="text-xl font-md text-black caption-top">
								Market - {marketStatus?.data?.market || "N/A"}
							</TableCaption>
							{marketStatus?.data?.market === "closed" ? (
								<PopularStockSnapShot snapshotData={snapshotData.data} />
							) : (
								<PopularStockLiveData
									wsStockData={wsStockData}
									snapshotData={snapshotData.data}
								/>
							)}
						</Table>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PopularStocks;
