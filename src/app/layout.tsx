import type { Metadata } from "next";

import "./globals.css";
import { Archivo } from "next/font/google";

import React from "react";
import Navbar from "@/components/Header/Navbar";

import Footer from "@/components/Footer/Footer";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

//👇 Configure our font object
const archivo = Archivo({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "CThis",
	description: "create and track stock portfolio ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={archivo.className}>
			<body className="flex flex-col w-full relative text-sm  font-light">
				<ConfigureAmplifyClientSide />
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
			</body>
		</html>
	);
}
