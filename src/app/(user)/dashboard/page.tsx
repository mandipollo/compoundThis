"use client";

import React from "react";

// Types
import { UserStockDetails } from "@/types/UserPortfolio.type";
// Ui
import { Loader2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// Components
import SectionContainer from "@/components/Containers/SectionContainer";
import PortfolioAllocationChart from "@/components/Dashboard/PortfolioAllocationChart";
import BaseAtGlanceChart from "@/components/Dashboard/BaseAtGlanceChart";
import InvestmentList from "@/components/Dashboard/InvestmentList";
import InvestmentSummary from "@/components/Dashboard/InvestmentSummary";
import PortfolioChart from "@/components/Dashboard/PortfolioChart";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
// Hooks
import usePortfolio from "@/hooks/swr/portfolio/usePortfolio";

const DashboardPage = () => {
	const { data, error, isLoading } = usePortfolio();

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
			<DashboardHeader currentValue={currentValue} />
			<Separator />
			<PortfolioChart />
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
