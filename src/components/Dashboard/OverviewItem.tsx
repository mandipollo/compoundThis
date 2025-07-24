import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const OverviewItem = ({
	overviewTitle,
	base,
	diff,
}: {
	overviewTitle: string;
	base: number;
	diff: number;
}) => {
	return (
		<Card className=" p-4 rounded-md gap-4 bg-white border ">
			<CardHeader>
				<CardTitle className=" font-light">{overviewTitle}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row items-center justify-between">
				<p className="text-xl ">£{base}</p>
				<p className="text-green-400">£{diff} today</p>
			</CardContent>
		</Card>
	);
};

export default OverviewItem;
