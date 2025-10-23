"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ui
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

// components
import DropdownUser from "./DropdownUser";

// store
import { useUserStore } from "@/store/userStore";

// Menu items.
const items = [
	{
		title: "Portfolio",
		url: "/portfolio",
		icon: BriefcaseBusinessIcon,
	},
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Search",
		url: "/search",
		icon: Search,
	},
	{
		title: "Mail",
		url: "/mail",
		icon: Mail,
	},
	{
		title: "Activity",
		url: "/activity",
		icon: Activity,
	},

	{
		title: "Settings",
		url: "/settings",
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
									<SidebarMenuButton
										asChild
										isActive={
											pathname === item.url ||
											pathname.startsWith(`${item.url}`)
										}
									>
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
