import React from "react";
import HoldingNews from "@/components/Holdings/News/News";
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return (
		<section className="flex w-full h-full">
			<HoldingNews holding={slug} />
		</section>
	);
};

export default page;
