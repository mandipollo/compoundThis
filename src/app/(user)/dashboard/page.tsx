import React from "react";

// Components
import PortfolioHeader from "@/components/Dashboard/Header";
import PortfolioTables from "@/components/Dashboard/Tables";
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
