import HoldingTradesList from "@/components/Holdings/Edit/HoldingTradesList";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return (
		<section className="flex flex-col gap-4">
			<HoldingTradesList ticker={slug} />
		</section>
	);
};

export default page;
