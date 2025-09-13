"use client";

// store
import { useUserStore } from "@/store/userStore";

const Footer = () => {
	const { isAuthenticated } = useUserStore();
	return (
		<footer
			className={`${
				isAuthenticated ? "hidden" : "flex flex-col"
			}  text-xs bg-primary items-center`}
		>
			<div className="flex flex-row gap-10 py-10 text-gray-300 w-full max-w-5xl">
				<ul className="flex flex-col gap-1 ">
					<li className="text-white">Popular Quotes</li>
					<li>NVDA</li>
					<li>Tesla</li>
					<li>Apple</li>
					<li>MSFT</li>
					<li>Llyods</li>
				</ul>
				<ul className="flex flex-col gap-1 ">
					<li className="text-white">Explore More</li>
					<li>Top Stocks</li>
					<li>Personal Finance</li>
					<li>Investing News</li>
					<li>Earnings</li>
				</ul>
			</div>

			<ul className="flex flex-row gap-2 bg-white text-black p-2 items-center justify-center">
				<li className="border-r px-2">Privacy</li>
				<li className="border-r px-2">Accessibility</li>
				<li className="border-r px-2">Site Terms</li>
				<li className="border-r px-2">Cookie Preferences</li>
				<li> © 2025, CompoundThis. All rights reserved</li>
			</ul>
		</footer>
	);
};

export default Footer;
