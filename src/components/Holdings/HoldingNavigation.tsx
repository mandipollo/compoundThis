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
		<div
			role="navigation"
			className="flex w-full py-4 sticky top-0 bg-white z-10"
		>
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
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/dashboard/${ticker}/financial`}
								exact
								className="inline-flex rounded-md px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
							>
								Financial statements
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/dashboard/${ticker}/notes`}
								exact
								className="inline-flex rounded-md px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
							>
								Notes
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/dashboard/${ticker}/news`}
								exact
								className="inline-flex rounded-md px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
							>
								News
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/dashboard/${ticker}/editHolding`}
								exact
								className="inline-flex rounded-md px-3 py-1.5 [&.active]:bg-primary [&.active]:text-white "
							>
								Edit holding
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default HoldingNavigation;
