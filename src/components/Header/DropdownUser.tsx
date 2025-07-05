import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/userStore";
import { redirect } from "next/navigation";

const DropdownUser = ({ username }: { username: string | undefined }) => {
	const { signOutUser } = useUserStore();
	const handleSignout = () => {
		signOutUser();
		redirect("/");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="py-2 px-6 rounded-md outline-none bg-white text-black hover:bg-gray-200 ">
				{username}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-0 p-2">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Dashboard</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownUser;
