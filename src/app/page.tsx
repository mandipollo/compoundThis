// components
import FullWidthContainer from "@/components/Containers/FullWidthContainer";
import CtaPage from "@/components/Home/CtaPage";
import FeaturesSectionGuide1 from "@/components/Home/FeaturesSectionGuide1";
import FeaturesSectionGuide2 from "@/components/Home/FeaturesSectionGuide2";
import Hero from "@/components/Home/Hero";
import PopularStocks from "@/components/Home/PopularStockFeed/PopularStocks";
import PreviewDashboard from "@/components/Home/PreviewDashboard";

export default function Home() {
	return (
		<FullWidthContainer>
			<Hero />
			<FeaturesSectionGuide1 />
			<FeaturesSectionGuide2 />
			<PopularStocks />
			<PreviewDashboard />
			<CtaPage />
		</FullWidthContainer>
	);
}
