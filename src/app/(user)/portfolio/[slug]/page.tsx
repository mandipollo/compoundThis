import HoldingsSummary from "@/components/Holdings/HoldingSummary/HoldingsSummary";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	return <HoldingsSummary ticker={slug} />;
};

export default page;
