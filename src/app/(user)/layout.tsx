import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/sidebar/Sidebar";
import Container from "@/components/Containers/Container";
import MaxWContainer from "@/components/Containers/MaxWContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<section className="flex flex-1 w-full h-full justify-center">
				<SidebarTrigger />
				<MaxWContainer>{children}</MaxWContainer>
			</section>
		</SidebarProvider>
	);
}
