"use client";

import React from "react";
import Image from "next/image";
import useQuoteAbout from "@/hooks/swr/holding/useAbout";

const HoldingCompany = ({
	ticker,
	primaryExchange,
	name,
}: {
	ticker: string;
	primaryExchange: string | null;
	name: String | null;
}) => {
	return (
		<section className="flex flex-row gap-2 items-center">
			<figure className="border rounded-md p-2">
				<Image
					src={`https://img.logo.dev/ticker/${ticker}?token=pk_CTlNJAdmQ4qhIgDoS0G-cg`}
					alt="demo"
					width={20}
					height={20}
				></Image>
			</figure>
			<div>
				<div className="gap-2 flex">
					<span className="border-r-1 border-black pr-1">{ticker}</span>
					<span>{primaryExchange}</span>
				</div>
				<span className="text-xs">{name}</span>
			</div>
		</section>
	);
};

export default HoldingCompany;
