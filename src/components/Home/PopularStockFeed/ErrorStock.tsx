import React from "react";
import Container from "@/components/Containers/Container";
import Image from "next/image";
const ErrorStock = () => {
	return (
		<section className="flex justify-center items-center w-full h-full bg-primary">
			<Container>
				<div className=" flex py-10 w-full h-full ">
					<div className="flex justify-center items-center bg-white rounded-4xl p-10 h-full w-full font-extralight">
						<span className="flex flex-col gap-2">
							<p>Uhoh Something went wrong...</p>
							<Image
								src="./monkey-error.svg"
								width={20}
								height={20}
								className="aspect-auto"
								alt="monkey"
							/>
						</span>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default ErrorStock;
