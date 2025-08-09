import React from "react";
import Overview from "./Overview";
import OverviewDetails from "./OverviewDetails";
import Watchlist from "./Watchlist";
import UserDash from "./UserDash";
import { Separator } from "../ui/separator";

const Dashboard = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<UserDash />
			<Separator />
			<Overview />
			<OverviewDetails />
			<Watchlist />
		</section>
	);
};

export default Dashboard;
