import Link from "next/link";
//COMPONENTS
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
const HoldingDialog = () => {
	return (
		<DialogContent className="sm:max-w-md md:max-w-xl ">
			<DialogHeader>
				<DialogTitle>Add your investments</DialogTitle>
				<DialogDescription>
					Select one of the options below to add investments into your CThis
					portfolio. You can always return to this page anytime to add more.
				</DialogDescription>
			</DialogHeader>
			<span>Trades</span>
			<div className="grid grid-cols-3 gap-4">
				<div className="border flex items-center justify-center rounded-md h-40 text-center p-4 line-through">
					Upload via broker
				</div>
				<div className="border flex items-center justify-center rounded-md h-40 text-center p-4 line-through">
					Upload via spreadsheet
				</div>
				<div className="border flex items-center justify-center rounded-md h-40 text-center p-4">
					<Link
						href={"/portfolio/onboard/manual"}
						className="hover:underline underline-offset-1"
					>
						Individually add investments
					</Link>
				</div>
			</div>
			<span>Other investments</span>
			<div className="grid grid-cols-3 gap-4">
				<div className="border bg-orange-200 flex items-center justify-center rounded-md h-40  text-center p-4 line-through">
					Upgrade for cash accounts
				</div>
				<div className="border flex items-center justify-center rounded-md h-40  text-center p-4 line-through">
					Create a custom investment
				</div>
			</div>
		</DialogContent>
	);
};

export default HoldingDialog;
