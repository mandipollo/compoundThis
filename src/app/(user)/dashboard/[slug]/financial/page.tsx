import HoldingAbout from "@/components/Holdings/HoldingFinancialStatements/HoldingAbout";
import HoldingDailySummary from "@/components/Holdings/HoldingFinancialStatements/HoldingDailySummary";
import HoldingLiveChart from "@/components/Holdings/HoldingFinancialStatements/HoldingLiveChart";
import HoldingStatement from "@/components/Holdings/HoldingFinancialStatements/HoldingStatement";
import React from "react";

const FinancialStatementPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;

	return (
		<section className="flex flex-col gap-4">
			<HoldingStatement selectedQuote={slug} />
		</section>
	);
};

export default FinancialStatementPage;
