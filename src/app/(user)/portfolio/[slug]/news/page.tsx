import HoldingNews from "@/components/Holdings/HoldingNews/HoldingNews";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return (
		<section className="flex w-full h-full">
			<HoldingNews holding={slug} />
		</section>
	);
};

export default page;
