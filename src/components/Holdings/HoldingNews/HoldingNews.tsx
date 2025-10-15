"use client";

import useHoldingNews from "@/hooks/swr/holding/useHoldingNews";
import React from "react";
import HoldingItem from "./HoldingItem";

const HoldingNews = ({ holding }: { holding: string }) => {
	const { data, isLoading, error } = useHoldingNews(holding);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	const newsData = data.data;
	return (
		<ul role="list" className="flex flex-col w-full gap-4 ">
			{newsData.results.map(item => (
				<HoldingItem key={item.id} item={item} />
			))}
		</ul>
	);
};

export default HoldingNews;
