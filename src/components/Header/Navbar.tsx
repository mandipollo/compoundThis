import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import CompoundThisLogo from "../Ui/CompoundThisLogo";

const Navbar = () => {
	return (
		<nav className="flex flex-col w-full bg-primary text-white">
			<section className="flex flex-row p-2 items-center w-full gap-2">
				<Link
					href={"/"}
					className="flex flex-row gap-2 border-r border-gray-400 px-4"
				>
					<div className="relative w-4 h-4">
						<CompoundThisLogo />
					</div>

					<p>CompoundThis</p>
				</Link>
				<div className="flex flex-1">
					<SearchBar />
				</div>
				<div className="flex flex-row gap-4 justify-center items-center ">
					<ul className="flex flex-row gap-4 border-r border-gray-400 px-2">
						<li>About</li>
						<li>Products</li>
					</ul>
					<div className="flex flex-row ">
						<Link
							href="/auth/login"
							className="bg-white text-black rounded-md w-full px-6 py-2 "
						>
							Sign in
						</Link>
					</div>
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
