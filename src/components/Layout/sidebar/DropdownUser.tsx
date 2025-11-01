import Link from "next/link";
import { redirect } from "next/navigation";

//UI
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { SidebarMenuButton } from "../../ui/sidebar";
//STORE
import { useUserStore } from "@/store/userStore";
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";

const DropdownUser = ({ username }: { username: string | undefined }) => {
	const { signOutUser } = useUserStore();
	const { clearSelectedQuote } = useSelectedQuoteStore();

	// Remove cookies from browser
	// TODO:ERROR HANDLING
	const handleSignout = async () => {
		await signOutUser();

		clearSelectedQuote();
		const response = await fetch("/api/auth/removeToken", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);

		redirect("/");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="py-2 px-6 rounded-md outline-none bg-white text-black hover:bg-gray-200 "
			>
				<SidebarMenuButton>
					<User2 /> {username}
					<ChevronUp className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				side="top"
				className="w-[--radix-popper-anchor-width]"
			>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={"/dashboard"}>Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownUser;
