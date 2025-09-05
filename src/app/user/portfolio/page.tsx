import React from "react";

// Components
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import PortfolioTables from "@/components/Portfolio/PortfolioTables";
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
