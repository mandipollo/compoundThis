import Link from "next/link";
import { Button } from "../ui/button";

const DashboardHeader = ({ currentValue }: { currentValue: number }) => {
	return (
		<div className="flex flex-col gap-2 ">
			<div className="flex flex-row justify-between items-center  ">
				<span className="text-xl underline underline-offset-2 decoration-green-700">
					CThis demo
				</span>
				<div className="flex flex-col">
					<p className="text-xl">GB£{currentValue.toFixed(2)}</p>
					<p className="text-[10px] text-accent-foreground">
						CURRENT PORTFOLIO VALUE
					</p>
				</div>
			</div>
			<div className="flex items-center justify-end p-2">
				<div role="navigation" className=" flex flex-row gap-2">
					<Button className="bg-orange-600 hover:bg-orange-700 text-xs hover:cursor-pointer">
						Upgrade Account
					</Button>
					<Button className="text-xs hover:cursor-pointer">
						<Link href={"/portfolio/onboard/manual"}>Add Investment</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
