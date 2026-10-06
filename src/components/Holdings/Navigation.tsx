import React from "react";

// UI
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
// COMPONENTS
import NavigationLink from "./NavigationLink";
const HoldingNavigation = ({ ticker }: { ticker: string }) => {
	return (
		<div className="flex w-full py-4 text-white">
			<NavigationMenu className="bg-secondaryGreen rounded-md p-1">
				<NavigationMenuList>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/portfolio/${ticker}`}
								exact
								className="inline-flex rounded-full px-3 py-1 [&.active]:bg-white [&.active]:text-black [&.active]:shadow-md"
							>
								Summary
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/portfolio/${ticker}/financial`}
								exact
								className="inline-flex rounded-full px-3 py-1 [&.active]:bg-white [&.active]:text-black [&.active]:shadow-md"
							>
								Financial statements
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/portfolio/${ticker}/notes`}
								exact
								className="inline-flex rounded-full px-3 py-1 [&.active]:bg-white [&.active]:text-black [&.active]:shadow-md"
							>
								Notes
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/portfolio/${ticker}/news`}
								exact
								className="inline-flex rounded-full px-3 py-1 [&.active]:bg-white [&.active]:text-black [&.active]:shadow-md"
							>
								News
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/portfolio/${ticker}/editHolding`}
								exact
								className="inline-flex rounded-full px-3 py-1 [&.active]:bg-white [&.active]:text-black [&.active]:shadow-md"
							>
								Transactions
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default HoldingNavigation;
