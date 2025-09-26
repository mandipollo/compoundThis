import HoldingForm from "@/components/Holdings/HoldingNotes/HoldingForm";
import NotesUpgrade from "@/components/Holdings/HoldingNotes/NotesUpgrade";
import React from "react";

const page = () => {
	return (
		<section className="flex flex-row gap-2">
			<HoldingForm />
			<div className="flex justify-center items-start">
				<NotesUpgrade />
			</div>
		</section>
	);
};

export default page;
