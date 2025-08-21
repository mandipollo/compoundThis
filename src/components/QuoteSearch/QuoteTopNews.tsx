import { Card, CardContent } from "../ui/card";

import { Separator } from "../ui/separator";

const QuoteTopNews = () => {
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
									<span className="text-muted-foreground text-xs">
										Yahoo finance : 8 minutes ago
									</span>
								</div>
								<div className="relative aspect-[5/4] h-20 border flex justify-center items-center rounded-md shadow-md">
									News Image
								</div>
							</CardContent>
						</Card>
					</div>
					<Separator />
				</div>
			))}
		</section>
	);
};

export default QuoteTopNews;
