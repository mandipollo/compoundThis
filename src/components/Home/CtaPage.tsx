import React from "react";

const CtaPage = () => {
	return (
		<section className="flex justify-center items-center w-full h-full bg-[#dae9e9] p-2 py-20 text-white font-extralight">
			<div className="flex bg-primary flex-col items-center max-w-5xl w-full h-96  p-[1px] rounded-4xl ">
				<h5 className="text-3xl pt-10">JOIN THE FINANCIAL REVOULTION</h5>
				<div className="grid grid-cols-2 w-full h-full p-10 gap-4">
					<div className="text-center border rounded-md">dashboard image</div>
					<div className="text-center border rounded-md">
						financial spreadsheet
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtaPage;
