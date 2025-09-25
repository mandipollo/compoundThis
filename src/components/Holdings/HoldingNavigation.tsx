import React from "react";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationLink from "./NavigationLink";

const HoldingNavigation = ({ ticker }: { ticker: string }) => {
	return (
		<div role="navigation" className="flex w-full py-4">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/dashboard/${ticker}`}
								exact
								className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white"
							>
								Summary
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/dashboard/${ticker}/financial`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
						>
							Financial statements
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/dashboard/${ticker}/notes`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
						>
							Notes
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/dashboard/${ticker}/news`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
						>
							News
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/dashboard/${ticker}/editHolding`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
						>
							Edit holding
						</NavigationLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default HoldingNavigation;
