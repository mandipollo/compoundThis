import React from "react";
import Container from "../Containers/Container";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";

const FeatureSectionGuide2 = () => {
	return (
		<section className="flex h-full w-full  items-center bg-primary">
			<div className=" flex justify-center items-center w-full h-full bg-white rounded-b-4xl">
				<Container>
					<div className="flex flex-col gap-10 py-38">
						<div className="grid grid-cols-2 gap-2  ">
							<div>
								<Image
									width={300}
									height={300}
									alt="Analysis image"
									src={
										"https://res.cloudinary.com/dbg68gzpx/image/upload/v1755871736/Group-12731_q6unjc.png"
									}
								/>
							</div>
							<div className="flex flex-wrap gap-2">
								<span className="text-6xl">Make</span>
								<span className="text-6xl">informed</span>
								<span className="text-6xl">investment</span>
								<span className="text-6xl">decisions.</span>
							</div>
						</div>

						<Accordion
							type="single"
							collapsible
							className="w-full"
							defaultValue="item-1"
						>
							<AccordionItem value="item-1">
								<AccordionTrigger>
									Take a closer look at any stocks
								</AccordionTrigger>
								<AccordionContent className="flex flex-col gap-4 text-balance">
									<p>
										Every stock page on Public has helpful information about the
										company and its performance, including key metrics, news,
										and recent activity from other investors.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									Get daily live analysis on the market
								</AccordionTrigger>
								<AccordionContent className="flex flex-col gap-4 text-balance">
									<p>
										Each day, you can hear experts, analysts, and journalists
										discuss the day&#39;s biggest market headlines—and what they
										mean for your portfolio—on Public Live.
									</p>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Upgrade your portfolio</AccordionTrigger>
								<AccordionContent className="flex flex-col gap-4 text-balance">
									<p>
										With Public Premium, you can unlock advanced data and
										company-specific analysis to help inform your stock-trading
										strategies even further.
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</Container>
			</div>
		</section>
	);
};

export default FeatureSectionGuide2;
