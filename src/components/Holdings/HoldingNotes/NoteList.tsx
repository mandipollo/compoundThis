"use client";

import useGetHoldingNotes from "@/hooks/swr/useGetHoldingNotes";
import React from "react";
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
} from "@/components/ui/table";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";

const NoteList = ({ slug }: { slug: string }) => {
	const { data, isLoading, error } = useGetHoldingNotes(slug);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	console.log(data);

	return (
		<div className="flex w-full">
			<Table>
				<TableBody className="gap-2 flex flex-col">
					{data.data.map(note => (
						<TableRow className="flex justify-between" key={note.id}>
							<TableCell>{note.noteSummary}</TableCell>
							<TableCell className="flex flex-row gap-2">
								{formatDistanceToNow(note.createdAt)}
								<Image
									src={"/iconActions/delete.svg"}
									alt="Delete icon"
									width={20}
									height={20}
								></Image>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default NoteList;
