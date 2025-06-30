"use client";

import React from "react";
import Navbar from "@/components/Header/Navbar";
import StoreProvider from "./redux";
import Footer from "@/components/Footer/Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<header className="fixed z-10 top-0 w-full ">
				<Navbar />
			</header>

			<main
				role="main"
				className="flex flex-1 mt-12 min-h-[calc(100vh-73.5px)] "
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<StoreProvider>
			<AppLayout>{children}</AppLayout>
		</StoreProvider>
	);
};

export default AppWrapper;
