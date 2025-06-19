import Image from "next/image";
import React from "react";

const IndexListItem = ({
	ticker,
	change,
}: {
	ticker: string;
	change: number;
}) => {
	return (
		<li
			role="listitem"
			className="flex flex-row gap-2 p-2 border-gray-300 border rounded-md hover:cursor-pointer hover:bg-gray-50"
		>
			{change >= 0 ? (
				<div className="relative w-4 h-4">
					<Image
						src="/up-arrow.svg"
						alt="gain"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			) : (
				<div className="relative w-4 h-4">
					<Image
						src="/down-arrow.svg"
						alt="loss"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			)}
			<p>{ticker}</p>
			<p className={` ${change >= 0 ? "text-[#90EE90]" : "text-[#FFB3B3]"} `}>
				{change}%
			</p>
		</li>
	);
};

export default IndexListItem;
