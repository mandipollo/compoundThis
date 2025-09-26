import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const NotesUpgradeCard = () => {
	return (
		<Card className="w-full max-w-sm flex flex-col gap-4 p-4 bg-orange-200 justify-center rounded-md">
			<CardHeader>
				<CardTitle>Add file attachments</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Attach up to 20 files to your holding to keep records in one place.
				</p>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button
					type="button"
					className="w-full bg-orange-600 hover:bg-orange-700 hover:cursor-pointer"
				>
					Upgrade to attach files
				</Button>
			</CardFooter>
		</Card>
	);
};

export default NotesUpgradeCard;
