import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function NewsCarousel() {
	return (
		<Carousel className="w-full ">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<div className="p-1">
							<Card>
								<CardContent className="flex flex-col shadow-md rounded-md aspect-square gap-4 py-4">
									<figure className="relative object-cover w-full h-full">
										<Image
											src="/meta-zuck.jpeg"
											fill
											alt="meta zuch "
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</figure>
									<span>CNBC</span>
									<p>
										Meta hits all time high as mark zuck goes on a hiring
										frenzy!
									</p>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
