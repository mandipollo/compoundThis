import CompoundThisLogo from "@/components/Ui/CompoundThisLogo";
import React from "react";

const Authlayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section className="flex flex-col w-full justify-center items-center ">
			<div className="flex flex-col gap-2 min-w-96">
				<div className="flex flex-row border rounded-md bg-primary text-white p-4">
					<CompoundThisLogo />
					<h1>Compound This</h1>
				</div>
				{children}
			</div>
		</section>
	);
};

export default Authlayout;
