import React from "react";
//COMPONENTS
import HoldingStatement from "@/components/Holdings/FinancialStatements/FinancialStatement";
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
