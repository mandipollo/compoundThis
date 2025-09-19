import React from "react";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavigationLink from "./NavigationLink";

const HoldingNavigation = ({ ticker }: { ticker: string }) => {
	return (
		<div role="navigation" className="flex w-full py-4">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationMenuLink asChild>
							<NavigationLink
								href={`/user/${ticker}`}
								exact
								className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-accent "
							>
								Summary
							</NavigationLink>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/user/${ticker}/trades`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-accent "
						>
							Trades & income
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/user/${ticker}/notes`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-accent "
						>
							Notes
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/user/${ticker}/news`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-accent "
						>
							News
						</NavigationLink>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:cursor-pointer">
						<NavigationLink
							href={`/user/${ticker}/editHolding`}
							exact
							className="inline-flex rounded-full px-3 py-1.5 [&.active]:bg-accent "
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
