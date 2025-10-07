"use client";

import React from "react";

// Types
import { UserStockDetails } from "@/types/UserPortfolio.type";
// Ui
import { Loader2Icon } from "lucide-react";
// Components
import SectionContainer from "@/components/Containers/SectionContainer";
import Overview from "@/components/Dashboard/Overview";
import OverviewDetailsHeader from "@/components/Dashboard/OverviewDetailsHeader";
import PortfolioAllocationChart from "@/components/Dashboard/PortfolioAllocationChart";
import BaseAtGlanceChart from "@/components/Dashboard/BaseAtGlanceChart";
import InvestmentList from "@/components/Dashboard/InvestmentList";
import InvestmentSummary from "@/components/Dashboard/InvestmentSummary";
import PortfolioChart from "@/components/Dashboard/PortfolioChart";
// Hooks
import useUserPortfolios from "@/hooks/swr/useUserPortfolio";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
	const { data, error, isLoading } = useUserPortfolios();

	//
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const stocks: UserStockDetails[] = data?.data ?? [];
	console.log(stocks);

	const currentValue = stocks.reduce(
		(acc, stock) =>
			acc +
			stock.quantity *
				(stock.snapshot.day.c === 0
					? stock.snapshot.prevDay.c
					: stock.snapshot.day.c),
		0
	);
	const baseValue = stocks.reduce(
		(acc, item) => acc + item.buyPrice * item.quantity,
		0
	);
	const capitalGains = currentValue - baseValue;
	const capitalGainPct = baseValue === 0 ? 0 : (capitalGains / baseValue) * 100;

	return (
		<SectionContainer>
			<Overview currentValue={currentValue} />
			<OverviewDetailsHeader />
			<Separator />
			<PortfolioChart stocks={stocks} />
			<InvestmentSummary
				capitalGains={capitalGains}
				capitalGainPct={capitalGainPct}
				currentValue={currentValue}
			/>
			<div className="grid grid-cols-2">
				<PortfolioAllocationChart portfolio={stocks} />
				<BaseAtGlanceChart currentValue={currentValue} baseValue={baseValue} />
			</div>
			<InvestmentList currentValue={currentValue} stocks={stocks} />
		</SectionContainer>
	);
};

export default DashboardPage;
