import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationLink = ({
	href,
	exact = false,
	className,
	children,
	...props
}: {
	href: string;
	exact?: boolean;
	className?: string;
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);
	const newClassName = isActive ? `${className} active` : className;

	return (
		<Link href={href} className={newClassName} {...props}>
			{children}
		</Link>
	);
};

export default NavigationLink;
