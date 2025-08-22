import React from "react";
import { ChartAreaDefault } from "./ChartHome";
import StockFundamentalOverview from "../Stock/StockFundamentalOverview";
import Container from "../Containers/Container";

const StockOverview = () => {
	return (
		<section className=" flex justify-center items-center w-full h-full bg-primary font-extralight ">
			<div className=" flex justify-center items-center w-full h-full  bg-white rounded-t-4xl">
				<Container>
					<div className="flex flex-col gap-10 py-38 w-full ">
						<h2 className="text-4xl ">Meta Platform Inc.</h2>
						<div className="grid grid-cols-[2fr_1fr] gap-4 w-full h-full ">
							<ChartAreaDefault />
							<div className=" border-gray-400 border-[0.5px] rounded-xl shadow-md ">
								<StockFundamentalOverview />
							</div>
						</div>
						<div className="flex w-full flex-col gap-4  h-full">
							<h4 className="text-3xl "> About</h4>
							<p>
								Meta Platforms, Inc. is an American multinational technology
								company headquartered in Menlo Park, California. Meta owns and
								operates several prominent social media platforms and
								communication services, including Facebook, Instagram, Threads,
								Messenger and WhatsApp. The company also operates an advertising
								network for its own sites and third parties; as of 2023,
								advertising accounted for 97.8 percent of its total revenue. The
								company was originally established in 2004 as TheFacebook, Inc.,
								and was renamed Facebook, Inc. in 2005. In 2021, it rebranded as
								Meta Platforms, Inc. to reflect a strategic shift toward
								developing the metaverse—an interconnected digital ecosystem
								spanning virtual and augmented reality technologies. Meta is
								considered one of the Big Five American technology companies,
								alongside Alphabet, Amazon, Apple, and Microsoft. In 2023, it
								was ranked 31st on the Forbes Global 2000 list of the
								world&#39;s largest public companies. As of 2022, it was the
								world&#39;s third-largest spender on research and development,
								with R&D expenses totaling US$35.3 billion.
							</p>
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default StockOverview;
