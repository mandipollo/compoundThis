"use client";

// Component

import InvestmentChart from "./InvestmentChart";
import InvestmentGroup from "./InvestmentGroup";

// ui
import { Loader2Icon } from "lucide-react";

//hooks
import useUserPortfolios from "@/hooks/swr/useUserPortfolio";
import useUserStockTotalValue from "@/hooks/swr/useUserStockTotalValue";
import OverviewDetailsHeader from "./OverviewDetailsHeader";

const OverviewDetails = () => {
	// fetch users demo portfolio
	// FIXME: FAILED ASSERTION ON STALE PRISMA DATA
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

	const stocks = dataStocks?.data?.stocks ?? [];
	const totalValue = stockTotalData.data;
	return (
		<section className="grid gap-2 grid-cols-1">
			<OverviewDetailsHeader />
			<InvestmentChart totalValue={totalValue} />

			{dataStocks?.data && stockTotalData?.data && (
				<InvestmentGroup stocks={stocks} totalValue={totalValue} />
			)}
		</section>
	);
};

export default OverviewDetails;
