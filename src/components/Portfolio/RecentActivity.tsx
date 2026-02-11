import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const demoData = [
	{ activity: "Withdraw", amount: 500 },
	{ activity: "Sell", amount: 230 },
	{ activity: "Deposit", amount: 5800 },
	{ activity: "BUY", amount: 23800 },
];
const RecentActivity = () => {
	return (
		<Card className=" h-full w-full">
			<CardHeader>
				<CardAction>View all</CardAction>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{demoData.map(data => (
							<TableRow>
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
