import React from "react";

const EarningCalenderListItem = () => {
	return (
		<li
			role="listitem"
			className="flex flex-row gap-2 border-t border-t-gray-300 py-2"
		>
			<div className="bg-blue-100 flex flex-col items-center w-10 h-10">
				<p className="text-xs text-blue-600">JUN</p>
				<p className="text-blue-600">4</p>
			</div>
			<div className="flex flex-col ">
				<p>B&M</p>
				<p className="text-xs font-extralight">4 Jun 2025, 07:00</p>
			</div>
		</li>
	);
};

export default EarningCalenderListItem;
