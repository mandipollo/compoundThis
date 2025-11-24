//UI
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
//COMPONENTS
import HoldingDialog from "./HoldingDialogue";
const DashboardHeader = ({
	currentValue,
	fxRate,
}: {
	currentValue: number;
	fxRate: number | null;
}) => {
	return (
		<div className="flex flex-col gap-2 ">
			<div className="flex flex-row justify-between items-center  ">
				<span className="text-xl underline underline-offset-2 decoration-green-700">
					CThis demo
				</span>
				<div className="flex flex-col items-end">
					<p className="text-xl">
						GBP {fxRate ? (fxRate * currentValue).toFixed(2) : null}
					</p>
					<p>USD {currentValue.toFixed(2)}</p>
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
					<Dialog>
						<DialogTrigger asChild>
							<Button className=" font-extralight text-xs" variant="outline">
								Add investments
							</Button>
						</DialogTrigger>
						<HoldingDialog />
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
