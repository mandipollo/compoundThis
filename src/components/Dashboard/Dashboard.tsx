import React from "react";
import SearchBar from "../Layout/search/SearchBar";
import Overview from "./Overview";
import OverviewDetails from "./OverviewDetails";
import Watchlist from "./Watchlist";
import UserDash from "./UserDash";

const Dashboard = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<div className="flex relative flex-row gap-2 w-full  ">
				<UserDash />
			</div>
			<Overview />
			<OverviewDetails />
			<Watchlist />
		</section>
	);
};

export default Dashboard;
