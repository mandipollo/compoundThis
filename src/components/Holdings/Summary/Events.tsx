import React from "react";

const Events = () => {
	return (
		<div className="flex w-full max-w-md flex-col gap-2">
			<span className="text-xl font-bold">Upcoming events</span>
			<ul className="gap-2 flex flex-col">
				<li className="flex flex-row gap-2 jus">
					<span>May 6, 2026</span>
					<span>- Ex dividend date</span>
				</li>
				<li className="flex flex-row gap-2">
					<span> November 6, 2026</span>
					<span>- Shareholder meetings</span>
				</li>
			</ul>
		</div>
	);
};

export default Events;
