"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const QuoteLiveFeed = ({ ticker }: { ticker: string }) => {
	const [testNumber, setTestNumber] = useState<number | null>(null);
	const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

	// connect to backend websocket to display live price feed
	useEffect(() => {
		const socket = io(server);

		// send ticker to the ws backend to subscribe
		socket.emit("ticker", ticker);

		// recieve quotes

		socket.on("quote", data => {
			if (data.ticker === ticker) {
				setTestNumber(data.price);
			}
		});
		return () => {
			socket.off("quote");
			socket.disconnect();
		};
	}, [ticker]);

	return (
		<div>
			<span className="text-xl">{testNumber}</span>
		</div>
	);
};

export default QuoteLiveFeed;
