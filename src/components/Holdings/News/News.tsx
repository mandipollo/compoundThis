"use client";

import React from "react";
//COMPONENTS
import HoldingItem from "./Item";
//HOOKS
import useHoldingNews from "@/hooks/swr/holding/useHoldingNews";

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
