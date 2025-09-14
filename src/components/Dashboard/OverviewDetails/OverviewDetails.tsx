"use client";

// Component

import InvestmentChart from "./InvestmentChart";
import InvestmentGroup from "./InvestmentGroup";

// ui
import { Loader2Icon } from "lucide-react";

//hooks
import useUserPortfolios from "@/hooks/swr/useUserPortfolio";
import useUserStockTotalValue from "@/hooks/swr/useUserStockTotalValue";

const OverviewDetails = () => {
	// fetch users demo portfolio

	const {
		data: dataStocks,
		error: errorStocks,
		isLoading: isLoadingStocks,
	} = useUserPortfolios();
	const {
		data: stockTotalData,
		isLoading: isLoadingStockValue,
		error: errorStockValue,
	} = useUserStockTotalValue();

	//
	if (isLoadingStocks || isLoadingStockValue) {
		return <Loader2Icon className="animate-spin" />;
	}

	if (errorStocks || errorStockValue) {
		return <div>{errorStocks}</div>;
	}

	console.log(dataStocks, stockTotalData);

	const { stocks } = dataStocks?.data;
	const totalValue = stockTotalData.data;
	return (
		<section className="grid gap-2 grid-cols-1">
			<InvestmentChart />
			<InvestmentGroup stocks={stocks} totalValue={totalValue} />
		</section>
	);
};

export default OverviewDetails;
