"use client";
import React from "react";
//HOOKS
import useHoldingNotes from "@/hooks/swr/holding/useHoldingNotes";
import { useSWRConfig } from "swr";
// UI
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// UTILS
import { formatDistanceToNow } from "date-fns";
const NoteList = ({ slug }: { slug: string }) => {
	// mutate
	const { mutate } = useSWRConfig();
	const { data, isLoading, error } = useHoldingNotes(slug);
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
				`/api/holding/note/delete?ticker=${slug}&noteId=${noteId}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);
			await response.json();
			mutate(`/api/holding/note/get?ticker=${slug}`);
		} catch (error: unknown) {
			console.log(error);
		}
	};
	return (
		<div className="flex w-full">
			<Table>
				<TableBody>
					{data.data.map(note => (
						<TableRow className="flex justify-between" key={note.id}>
							<TableCell>{note.noteSummary}</TableCell>
							<TableCell className="flex flex-row gap-2 items-center">
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
