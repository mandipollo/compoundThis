import React from "react";
//COMPONENTS
import HoldingForm from "@/components/Holdings/Notes/Form";
import NoteList from "@/components/Holdings/Notes/NoteList";
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	return (
		<section className="flex flex-col gap-2">
			<div className="flex items-center justify-end">
				<HoldingForm slug={slug} />
			</div>
			<div className="flex w-full justify-center items-start">
				<NoteList slug={slug} />
			</div>
		</section>
	);
};

export default page;
