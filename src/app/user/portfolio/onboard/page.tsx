import React from "react";

// components
import Container from "@/components/Containers/Container";
import SectionContainer from "@/components/Containers/SectionContainer";
import GeneralCard from "@/components/Cards/GeneralCard";

const OnboardPage = () => {
	return (
		<SectionContainer>
			<Container>
				<div className="flex flex-col  w-full items-center justify-center">
					<h1 className="text-2xl pb-10">Get your investment into CThis</h1>

					<div className="grid grid-cols-3 w-full gap-4">
						<GeneralCard
							condition="Coming soon"
							image="https://res.cloudinary.com/dbg68gzpx/image/upload/v1757099443/broker-2213679bf24e15b0fee8_necllq.svg"
							title="Search for your broker"
						/>
						<GeneralCard
							condition="Coming soon"
							image="https://res.cloudinary.com/dbg68gzpx/image/upload/v1757099443/self-managed-9c9eb5b56f2ed7060eb1_ffvj3g.svg"
							title="Upload self managed CSV"
						/>
						<GeneralCard
							condition=""
							image="https://res.cloudinary.com/dbg68gzpx/image/upload/v1757099443/individual-cfaf985863eebec86f6a_cn0fir.svg"
							title="Add trades individually"
						/>
					</div>
				</div>
			</Container>
		</SectionContainer>
	);
};

export default OnboardPage;
