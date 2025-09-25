import React from "react";
import Image from "next/image";
// ui
import { Separator } from "../../ui/separator";
import { Loader2Icon } from "lucide-react";

// hooks
import useQuoteAbout from "@/hooks/swr/useQuoteAbout";

import numberToDispaly from "@/utils/numberFormatter";

const QuoteAbout = ({ selectedQuote }: { selectedQuote: string }) => {
	if (!selectedQuote) {
		return;
	}
	const { data, error, isLoading } = useQuoteAbout(`${selectedQuote}`);

	if (error) {
		return <div>Error</div>;
	}
	if (isLoading) {
		return <Loader2Icon className="animate-spin" />;
	}
	if (!data) {
		return <Loader2Icon className="animate-spin" />;
	}
	const about = data?.data;

	return (
		<div className="border rounded-md shadow-md p-2 gap-2">
			<span className="text-lg py-2 flex gap-2 flex-row">
				{about?.name ?? "N/A"}
			</span>
			<div className="flex flex-col gap-4">
				<p className="text-xs">{about?.description ?? "N/A"}</p>
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
					<span>{about?.listDate ?? "N/A"}</span>
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
						{about?.city ?? "N/A"}-{about?.state ?? "N/A"}
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
					{about?.homePageUrl ? (
						<a
							href={about?.homePageUrl}
							target="_blank"
							className="text-blue-600"
						>
							{about?.homePageUrl}
						</a>
					) : (
						"N/A"
					)}
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
					<span>{about?.totalEmployees ?? "N/A"}</span>
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center justify-center">
						<Image
							src={"/iconsAbout/market_value.svg"}
							width={15}
							height={15}
							alt="group of people icon"
						/>
						<span className="text-xs text-muted-foreground">MARKET CAP</span>
					</div>
					<span>
						{about?.marketCap ? numberToDispaly(about?.marketCap) : "N/A"}
					</span>
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
					<span>{about?.primaryExchange ?? "N/A"}</span>
				</div>
			</div>
		</div>
	);
};

export default QuoteAbout;
