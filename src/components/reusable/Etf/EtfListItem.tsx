import React from "react";
import Image from "next/image";
const EtfListItem = () => {
	return (
		<li
			role="listitem"
			className="flex flex-row justify-between items-center gap-2 border-t border-t-gray-300 py-2"
		>
			<div className="flex flex-row items-center gap-2">
				<p className="text-xs text-white bg-red-500 rounded-md px-2 py-1 items-center flex">
					CSPX
				</p>
			</div>

			<span>£546.07</span>
			<span className="text-[#247e45]">£6</span>
			<span className="flex flex-row gap-1 bg-[#e8f4ea] text-[#247e45] px-2 py-1 rounded-md">
				<div className="h-4 w-4 relative">
					<Image
						src="up-arrow.svg"
						fill
						alt="stock price upward"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				£546
			</span>
		</li>
	);
};

export default EtfListItem;
