import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<section className="flex flex-1 w-full h-full">
				<SidebarTrigger />
				{children}
			</section>
		</SidebarProvider>
	);
}
