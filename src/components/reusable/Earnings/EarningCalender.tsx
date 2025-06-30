import React from "react";
import EarningCalenderListItem from "./EarningCalenderListItem";
const EarningCalender = () => {
	return (
		<div className="flex flex-col gap-1 rounded-md p-2 w-72 border border-gray-300">
			<h2 className="text-lg">Earnings calender</h2>
			<p className="text-gray-500">Based on popular stocks</p>
			<ul role="list" className="flex flex-col gap-2 w-full">
				<EarningCalenderListItem />
				<EarningCalenderListItem />
				<EarningCalenderListItem />
				<EarningCalenderListItem />
			</ul>
		</div>
	);
};

export default EarningCalender;
