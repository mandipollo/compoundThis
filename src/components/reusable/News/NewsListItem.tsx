import React from "react";
import Image from "next/image";

const NewsListItem = () => {
	return (
		<li className="flex w-full flex-row gap-2 justify-center py-2 border-t border-gray-300">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<p className="text-xs">BBC</p>
					<span className="h-[3px] w-[3px] rounded-full inline-block bg-gray-400"></span>
					<p className="font-extralight text-xs">8 hours ago</p>
				</div>
				<p>just text</p>
			</div>
			<div className="relative w-36 h-auto ">
				<Image
					src="/newsImageDemo.jpeg"
					fill
					alt="demo image"
					className="rounded-md"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
		</li>
	);
};

export default NewsListItem;
