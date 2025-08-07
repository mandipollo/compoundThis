import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

import Image from "next/image";
import { Separator } from "../ui/separator";

const InstrumentTopNews = () => {
	return (
		<section className="flex w-full h-full flex-col">
			<h3 className="text-lg">Top news</h3>

			{Array.from({ length: 4 }).map((_, index) => (
				<div key={index} className="md:basis-1/2 lg:basis-1/3">
					<div className="p-1">
						<Card>
							<CardContent className="flex flex-row w-full items-center justify-between">
								<div className="flex flex-col">
									<span>
										Meta hits all time high as mark zuck goes on a hiring
										frenzy!
									</span>
									<span className="text-gray-400 text-xs">
										Yahoo finance : 8 minutes ago
									</span>
								</div>
								<figure className="relative aspect-[5/4] h-20">
									<Image
										src="/meta-zuck.jpeg"
										fill
										alt="meta zuch "
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</figure>
							</CardContent>
						</Card>
					</div>
					<Separator />
				</div>
			))}
		</section>
	);
};

export default InstrumentTopNews;
