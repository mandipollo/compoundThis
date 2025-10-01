"use client";
import React, { useState } from "react";

// ui

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// swr

import { useSWRConfig } from "swr";
// zod

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	noteSummary: z
		.string()
		.min(2, {
			message: "Umm really?",
		})
		.max(200),
});

const HoldingNoteForm = ({ slug }: { slug: string }) => {
	const { mutate } = useSWRConfig();
	// Dialog

	const [open, setOpen] = useState<boolean>(false);
	// Form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			noteSummary: "",
		},
	});

	// Submit handler
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("Submit start");

		try {
			const response = await fetch(
				`/api/user/addNoteToHolding?ticker=${slug}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(values),
				}
			);
			await response.json();
			form.reset({ noteSummary: "" });
			setOpen(false);

			// revalidate the parents SWR key
			mutate(`/api/user/getHoldingNotes?ticker=${slug}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Add new note</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add note</DialogTitle>
					<DialogDescription>
						Add notes to your holdings. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex relative flex-col gap-4"
					>
						<div className="flex relative w-full flex-col">
							<FormField
								control={form.control}
								name="noteSummary"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea className="resize-none" {...field}></Textarea>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default HoldingNoteForm;
