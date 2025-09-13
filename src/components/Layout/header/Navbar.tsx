"use client";
import Link from "next/link";

// store
import { useUserStore } from "@/store/userStore";
const Navbar = () => {
	const { isAuthenticated } = useUserStore();

	if (isAuthenticated) {
		return;
	}
	return (
		<nav
			role="navigation"
			aria-label="Main Navigation"
			className="flex flex-col w-full bg-primary text-white shadow-xl"
		>
			<div className="flex flex-row p-2 items-center justify-between w-full gap-2">
				<Link href={"/"} className="flex items-center px-4">
					<span className="text-xl ">CThis</span>
				</Link>

				<div className="flex flex-row gap-4 justify-center items-center ">
					<ul className="flex flex-row gap-4 border-r border-gray-400 px-2">
						<li>About</li>
						<li>Products</li>
					</ul>

					<Link
						href="/auth/login"
						className="bg-white text-black rounded-md w-full px-6 py-2 "
					>
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
