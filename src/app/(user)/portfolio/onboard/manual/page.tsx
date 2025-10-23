import React from "react";

//components
import FullWidthContainer from "@/components/Containers/FullWidthContainer";
import SectionContainer from "@/components/Containers/SectionContainer";
import ManualAddStockForm from "@/components/Portfolio/AddHolding/ManualAddStockForm";

const page = () => {
	return (
		<SectionContainer>
			<FullWidthContainer>
				<h1 className="text-xl p-4">Add Trade</h1>
				<div className="flex justify-center items-center flex-1 bg-accent">
					<ManualAddStockForm />
				</div>
			</FullWidthContainer>
		</SectionContainer>
	);
};

export default page;
