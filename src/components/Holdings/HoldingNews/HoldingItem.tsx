import { NewsItem } from "@/types/NewsApiResponse.type";
import MyImage from "@/utils/ImageLoader";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";

const HoldingItem = ({ item }: { item: NewsItem }) => {
	return (
		<li className="flex flex-row gap-2 py-2 border-b" key={item.id}>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<span>{item.author}</span>
					<span className="flex gap-4 items-center justify-center">
						<Image
							src={item.publisher.logo_url}
							alt={`${item.publisher.name} logo`}
							width={50}
							height={50}
						/>
						{formatDistanceToNow(new Date(item.published_utc), {
							addSuffix: true,
						})}
					</span>
				</div>
				<div className="flex flex-row gap-2">
					<a
						role="link"
						href={item.article_url}
						target="_blank"
						className="underline hover:cursor-pointer text-green-700"
					>
						{item.title}
					</a>
					<Image
						src="/out-link.svg"
						alt="outlink icon"
						width={20}
						height={20}
					/>
				</div>

				<div>{item.description}</div>
			</div>
			<MyImage
				src={item.image_url}
				title={item.title}
				width={120}
				height={100}
			/>
		</li>
	);
};

export default HoldingItem;
