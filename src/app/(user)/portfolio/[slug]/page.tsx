import React from "react";
import HoldingsSummary from "@/components/Holdings/Summary/Summary";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return <HoldingsSummary ticker={slug} />;
};

export default page;
