import React from "react";

// Component

import InvestmentChart from "./InvestmentChart";
import InvestmentGroup from "./InvestmentGroup";

const OverviewDetails = () => {
	return (
		<section className="grid gap-2 grid-cols-1">
			<InvestmentChart />
			<InvestmentGroup />
		</section>
	);
};

export default OverviewDetails;
