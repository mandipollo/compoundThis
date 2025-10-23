"use client";

import { use } from "react";
// components
import SectionContainer from "@/components/Containers/SectionContainer";
import HoldingNavigation from "@/components/Holdings/HoldingNavigation";
import HoldingCompany from "@/components/Holdings/HoldingCompany";
// hooks
import useAbout from "@/hooks/swr/holding/useAbout";

export default function HoldingLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);

	if (!slug) return;
	const { data, isLoading, error } = useAbout(slug);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}

	if (!data) {
		return <div>Oho oh</div>;
	}
	const { primaryExchange, name } = data.data;
	return (
		<SectionContainer>
			<HoldingCompany
				ticker={slug}
				primaryExchange={primaryExchange}
				name={name}
			/>
			<HoldingNavigation ticker={slug} />
			{children}
		</SectionContainer>
	);
}
