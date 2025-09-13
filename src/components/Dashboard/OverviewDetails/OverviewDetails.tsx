"use client";

// Component

import useUserPortfolios from "@/hooks/swr/useUserPortfolio";
import InvestmentChart from "./InvestmentChart";
import InvestmentGroup from "./InvestmentGroup";

const OverviewDetails = () => {
	// fetch users demo portfolio

	const { data, error, isLoading } = useUserPortfolios();
	console.log(data);

	return (
		<section className="grid gap-2 grid-cols-1">
			<InvestmentChart />
			<InvestmentGroup />
		</section>
	);
};

export default OverviewDetails;
