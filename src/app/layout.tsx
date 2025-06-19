import type { Metadata } from "next";

import "./globals.css";
import { Open_Sans } from "next/font/google";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import AppWrapper from "./appWrapper";

//👇 Configure our font object
const openSans = Open_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Compound This",
	description: "create and track stock portfolio ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={openSans.className}>
			<body className="flex flex-col relative text-sm  font-light">
				<ConfigureAmplifyClientSide />
				<AppWrapper>{children}</AppWrapper>
			</body>
		</html>
	);
}
