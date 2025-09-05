"use client";
import {
	Activity,
	Mail,
	Search,
	Settings,
	LayoutDashboard,
	BriefcaseBusinessIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import { useUserStore } from "@/store/userStore";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/user",
		icon: LayoutDashboard,
	},
	{
		title: "Portfolio",
		url: "/user/portfolio",
		icon: BriefcaseBusinessIcon,
	},
	{
		title: "Search",
		url: "/user/search",
		icon: Search,
	},
	{
		title: "Mail",
		url: "/user/mail",
		icon: Mail,
	},
	{
		title: "Activity",
		url: "/user/activity",
		icon: Activity,
	},

	{
		title: "Settings",
		url: "/user/settings",
		icon: Settings,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	const { name } = useUserStore();
	return (
		<Sidebar>
			<SidebarContent className="bg-primary text-gray-400">
				<SidebarGroup>
					<SidebarGroupLabel className="text-xl text-white">
						CThis
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-2 mt-4">
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild isActive={pathname === item.url}>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="bg-primary">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownUser username={name} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
