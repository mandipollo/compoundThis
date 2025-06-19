import React from "react";
import EtfListItem from "./EtfListItem";

const EtfLandingList = () => {
	return (
		<div className="flex flex-col gap-1 rounded-md p-2 w-72 border border-gray-300">
			<h4 className="text-lg">Etf&apos;s to watch</h4>
			<ul role="list" className="flex flex-col gap-2">
				<EtfListItem />
				<EtfListItem />
				<EtfListItem />
				<EtfListItem />
			</ul>
		</div>
	);
};

export default EtfLandingList;
