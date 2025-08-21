import React from "react";
import Image from "next/image";
const InfiniteScrollLogo = () => {
	const logos = [
		{ src: "/meta.svg", alt: "Meta" },
		{ src: "/alphabet.svg", alt: "Alphabet" },
		{
			src: "/amd.svg",
			alt: "AMD",
		},
		{ src: "/apple.svg", alt: "Apple" },
		{ src: "/blackberry.svg", alt: "Blackberry" },
		{ src: "/tesla.svg", alt: "Tesla" },
	];
	return (
		<div className="inline-flex text-xl w-full pt-38 pb-10 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
			<ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
				{logos.map((logo, index) => (
					<li key={index} className="flex flex-row gap-2 items-center">
						<Image src={logo.src} alt={logo.alt} width={30} height={30} />
						<span>{logo.alt}</span>
					</li>
				))}
			</ul>
			<ul
				className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
				aria-hidden="true"
			>
				{logos.map((logo, index) => (
					<li key={index} className="flex flex-row gap-2 items-center">
						<Image src={logo.src} alt={logo.alt} width={30} height={30} />
						<span>{logo.alt}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default InfiniteScrollLogo;
