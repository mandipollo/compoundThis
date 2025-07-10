import React from "react";
import SearchBar from "../Layout/search/SearchBar";
import Overview from "./Overview";
import OverviewDetails from "./OverviewDetails";
import Watchlist from "./Watchlist";
import UserDash from "./UserDash";

const Dashboard = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<div className="flex flex-row gap-2 w-full items-center justify-between">
				<UserDash />
				<SearchBar />
			</div>

			<Overview />
			<OverviewDetails />
			<Watchlist />
		</section>
	);
};

export default Dashboard;
