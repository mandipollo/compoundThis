import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const PortfolioHeader = () => {
	return (
		<div className="flex flex-row justify-between items-center pb-10">
			<h1 className="text-xl">Portfolios</h1>
			<Link href={"/user/portfolio/new"}>
				<Button className="text-xs font-light">Add portfolio</Button>
			</Link>
		</div>
	);
};

export default PortfolioHeader;
