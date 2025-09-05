import React from "react";
import Overview from "./Overview";
import OverviewDetails from "./OverviewDetails/OverviewDetails";
import UserDash from "./UserDash";

const Dashboard = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<UserDash />
			<Overview />
			<OverviewDetails />
		</section>
	);
};

export default Dashboard;
