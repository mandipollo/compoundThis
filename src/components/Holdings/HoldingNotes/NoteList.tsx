"use client";

import useGetHoldingNotes from "@/hooks/swr/useGetHoldingNotes";
import React from "react";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";

const NoteList = ({ slug }: { slug: string }) => {
	// mutate
	const { mutate } = useSWRConfig();
	const { data, isLoading, error } = useGetHoldingNotes(slug);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	// handle delete

	const handleDeleteNote = async ({ noteId }: { noteId: number }) => {
		try {
			const response = await fetch(
				`/api/user/deleteNoteFromHolding?ticker=${slug}&noteId=${noteId}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);

			const data = await response.json();
			console.log(data);
			mutate(`/api/user/getHoldingNotes?ticker=${slug}`);
		} catch (error: unknown) {
			console.log(error);
		}
	};
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
								<Button
									onClick={() => handleDeleteNote({ noteId: note.id })}
									variant="destructive"
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default NoteList;
