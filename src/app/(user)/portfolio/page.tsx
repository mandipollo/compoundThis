"use client";
import React from "react";
//TYPES
import { UserStock } from "@/types/UserPortfolio.type";
//UI
import { Loader2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
//COMPONENTS
import SectionContainer from "@/components/Containers/SectionContainer";
import usePortfolio from "@/hooks/swr/portfolio/usePortfolio";
import DashboardHeader from "@/components/Portfolio/Header";
import InvestmentSummary from "@/components/Portfolio/InvestmentSummary";
import PortfolioChart from "@/components/Portfolio/TimeSeriesChart";
import PortfolioAllocationChart from "@/components/Portfolio/AllocationChart";
import BaseAtGlanceChart from "@/components/Portfolio/BaseAtGlanceChart";
import InvestmentList from "@/components/Portfolio/InvestmentList";
//STORE
import { useFxStore } from "@/store/fxRateStore";

const DashboardPage = () => {
	// Current fx rate
	const { fxRate } = useFxStore();
	//TODO: check if the market is open ? establish socket cc and send the user portfolio tickers : fetch and display the latest current price of the holdings
	const { data, error, isLoading } = usePortfolio();
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (error) {
		return <div>{error}</div>;
	}
	const stocks: UserStock[] = data?.data ?? [];
	const currentValue = stocks.reduce(
		(acc, stock) => acc + stock.quantity * stock.snapshot.day.c,
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
			<DashboardHeader fxRate={fxRate} currentValue={currentValue} />
			<Separator />
			<PortfolioChart />
			<InvestmentSummary
				fxRate={fxRate}
				capitalGains={capitalGains}
				capitalGainPct={capitalGainPct}
			/>
			<div className="grid grid-cols-2">
				<PortfolioAllocationChart portfolio={stocks} fxRate={fxRate} />
				<BaseAtGlanceChart
					fxRate={fxRate}
					currentValue={currentValue}
					baseValue={baseValue}
				/>
			</div>
			<InvestmentList
				fxRate={fxRate}
				currentValue={currentValue}
				stocks={stocks}
			/>
		</SectionContainer>
	);
};

export default DashboardPage;
