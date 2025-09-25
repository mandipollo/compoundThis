import React from "react";

// components
import SectionContainer from "@/components/Containers/SectionContainer";
import Overview from "@/components/Dashboard/Overview";
import OverviewDetails from "@/components/Dashboard/OverviewDetails/OverviewDetails";
import UserDash from "@/components/Dashboard/UserDash";
import Container from "@/components/Containers/Container";

const DashboardPage = () => {
	return (
		<SectionContainer>
			<UserDash />
			<Overview />
			<OverviewDetails />
		</SectionContainer>
	);
};

export default DashboardPage;
