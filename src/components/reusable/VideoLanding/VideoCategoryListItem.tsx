import React from "react";

const VideoCategoryListItem = ({ category }: { category: string }) => {
	return (
		<li
			role="listitem"
			className="border-t-[0.5px] border-t-gray-500 p-4 items-center flex"
		>
			<button>{category}</button>
		</li>
	);
};

export default VideoCategoryListItem;
