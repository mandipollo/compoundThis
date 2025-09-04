import Image from "next/image";
import React from "react";
import Container from "../Containers/Container";
import { Button } from "../ui/button";
import Link from "next/link";

const CtaPage = () => {
	return (
		<section className="flex justify-center items-center w-full h-full bg-[#dae9e9] p-2 py-20 text-white font-extralight">
			<Container>
				<div className="flex bg-primary flex-col gap-4 justify-center items-center w-full h-full py-20 rounded-4xl ">
					<Image src="./logo.svg" alt="Company logo" width={40} height={40} />
					<span className="text-2xl">JOIN THE FINANCIAL REVOLUTION TODAY</span>
					<div className="flex flex-row gap-2">
						<Link href={"/auth/signup"}>
							<Button className="bg-[#1C6EA4] hover:bg-[#154D71] hover:cursor-pointer ">
								Start Now
							</Button>
						</Link>
						<Button className="bg-white hover:bg-gray-200 text-black">
							Learn More
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default CtaPage;
