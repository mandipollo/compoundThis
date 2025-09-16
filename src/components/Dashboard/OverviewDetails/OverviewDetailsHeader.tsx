import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

//TODO: UPGRADE ACCOUNT
const OverviewDetailsHeader = () => {
	return (
		<div className="flex items-center justify-end p-2">
			<div role="navigation" className=" flex flex-row gap-2">
				<Button className="bg-orange-600 hover:bg-orange-700 text-xs hover:cursor-pointer">
					Upgrade Account
				</Button>
				<Button className="text-xs hover:cursor-pointer">
					<Link href={"/user/portfolio/onboard/manual"}>Add Investment</Link>
				</Button>
			</div>
		</div>
	);
};

export default OverviewDetailsHeader;
