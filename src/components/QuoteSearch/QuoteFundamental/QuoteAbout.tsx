import React from "react";
import Image from "next/image";
// ui
import { Separator } from "../../ui/separator";
import { Loader2Icon } from "lucide-react";

// hooks
import useQuoteAbout from "@/hooks/swr/useQuoteAbout";

const QuoteAbout = ({ selectedQuote }: { selectedQuote: string }) => {
	if (!selectedQuote) {
		return;
	}
	const { error, isLoading, data } = useQuoteAbout(`${selectedQuote}`);

	if (error) {
		return <div>Error</div>;
	}
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}

	return (
		<div className="border rounded-md shadow-md p-2 gap-2">
			<h4 className="text-lg py-2">About</h4>
			<div className="flex flex-col gap-4">
				<p className="text-xs">{data.data.description}</p>
				<Separator />

				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/calender.svg"}
							width={15}
							height={15}
							alt="calender icon"
						/>
						<span className="text-xs text-muted-foreground">LISTED DATE</span>
					</div>
					<span>{data.data.listDate}</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/location.svg"}
							width={15}
							height={15}
							alt="map pin icon"
						/>
						<span className="text-xs text-muted-foreground">HEADQUARTERS</span>
					</div>
					<span>
						{data.data.city} {data.data.state}
					</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/website.svg"}
							width={15}
							height={15}
							alt="website icon"
						/>
						<span className="text-xs text-muted-foreground">WEBSITE</span>
					</div>
					<a
						href={data.data.homePageUrl}
						target="_blank"
						className="text-blue-600"
					>
						{data.data.homePageUrl}
					</a>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/employees.svg"}
							width={15}
							height={15}
							alt="group of people icon"
						/>
						<span className="text-xs text-muted-foreground">EMPLOYEES</span>
					</div>
					<span>{data.data.totalEmployees}</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/exchange.svg"}
							width={15}
							height={15}
							alt="exchange icon"
						/>
						<span className="text-xs text-muted-foreground">
							PRIMARY EXCHANGE
						</span>
					</div>
					<span>{data.data.primaryExchange}</span>
				</div>
			</div>
		</div>
	);
};

export default QuoteAbout;
