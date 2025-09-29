"use client";

// Component
import InvestmentChart from "./InvestmentChart";
import InvestmentList from "./InvestmentList";

// ui
import { Loader2Icon } from "lucide-react";

//hooks
import useUserPortfolios from "@/hooks/swr/useUserPortfolio";
import OverviewDetailsHeader from "./OverviewDetailsHeader";
import { UserStockDetails } from "@/types/UserPortfolio.type";
import PortfolioAllocationChart from "./PortfolioAllocationChart";
import BaseAtGlanceChart from "./BaseAtGlanceChart";

const OverviewDetails = () => {
	// fetch users demo portfolio
	// FIXME: FAILED ASSERTION ON STALE PRISMA DATA
	const { data, error, isLoading } = useUserPortfolios();

	//
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const stocks: UserStockDetails[] = data?.data ?? [];

	return (
		<section className="grid gap-2 grid-cols-1">
			<OverviewDetailsHeader />
			<InvestmentChart stocks={stocks} />
			<div className="grid grid-cols-2">
				<PortfolioAllocationChart portfolio={stocks} />
				<BaseAtGlanceChart portfolio={stocks} />
			</div>
			<InvestmentList stocks={stocks} />
		</section>
	);
};

export default OverviewDetails;
