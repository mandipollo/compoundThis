import React from "react";
import OverviewItem from "./OverviewItem";

const Overview = () => {
	return (
		<section className="grid grid-cols-3 gap-2">
			<OverviewItem
				overviewTitle="My Investment Assets"
				base={176289}
				diff={167}
			/>
			<OverviewItem overviewTitle="Yearly Profits" base={76289} diff={167} />
			<OverviewItem overviewTitle="World index" base={289} diff={167} />
		</section>
	);
};

export default Overview;
