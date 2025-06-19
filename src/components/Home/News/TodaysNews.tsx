import React from "react";
import NewsListItem from "./NewsListItem";

const TodaysNews = () => {
	return (
		<section className="flex flex-col gap-2 w-full">
			<h1 className="text-lg">Today&apos;s financial news</h1>
			<ul className="flex flex-col w-full gap-2">
				<NewsListItem />
				<NewsListItem />
				<NewsListItem />
				<NewsListItem />
				<NewsListItem />
				<NewsListItem />
				<NewsListItem />
			</ul>
		</section>
	);
};

export default TodaysNews;
