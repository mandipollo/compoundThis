import React from "react";

// Components
import PortfolioHeader from "@/components/Dashboard/DashboardHeader";
import PortfolioTables from "@/components/Dashboard/DashboardTables";
import SectionContainer from "@/components/Containers/SectionContainer";

const PortfolioPage = () => {
	return (
		<SectionContainer>
			<PortfolioHeader />
			<PortfolioTables />
		</SectionContainer>
	);
};

export default PortfolioPage;
