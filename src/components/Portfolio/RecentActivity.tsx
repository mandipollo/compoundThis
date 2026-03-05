import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { EllipsisVertical, EllipsisVerticalIcon } from "lucide-react";

import {
	HoverCardTrigger,
	HoverCardContent,
	HoverCard,
} from "../ui/hover-card";
import { Button } from "../ui/button";

const demoData = [
	{ activity: "Withdraw", amount: 500 },
	{ activity: "Sell", amount: 230 },
	{ activity: "Deposit", amount: 5800 },
	{ activity: "BUY", amount: 23800 },
];
const RecentActivity = () => {
	return (
		<Card className=" h-full w-full relative">
			<CardHeader>
				<CardAction className="">
					<HoverCard openDelay={10} closeDelay={100}>
						<HoverCardTrigger asChild>
							<EllipsisVerticalIcon className="h-4"></EllipsisVerticalIcon>
						</HoverCardTrigger>
						<HoverCardContent className="flex w-28 flex-col gap-0.5">
							<Button variant="ghost" className="w-20">
								View all
							</Button>
						</HoverCardContent>
					</HoverCard>
				</CardAction>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{demoData.map((data, index) => (
							<TableRow key={index}>
								<TableCell>{data.activity}</TableCell>
								<TableCell align="right">{data.amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
export default RecentActivity;
