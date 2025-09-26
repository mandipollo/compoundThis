"use client";
import React from "react";
import { useRouter } from "next/navigation";
// ui

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

// date needs to be formatted as the same as server and client to resolve hydration issues
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	note: z
		.string()
		.min(2, {
			message: "Umm really?",
		})
		.max(200),
});

//TODO:SEARCH COMPANY SUGGESTION
const HoldingNoteForm = () => {
	const route = useRouter();

	// Forms

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			note: undefined,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex relative flex-col gap-4 w-full max-w-xl bg-white px-4 py-6 rounded-md shadow-md"
			>
				<div className="flex relative w-full flex-col">
					<FormField
						control={form.control}
						name="note"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Keep personal notes for your holdings</FormLabel>
								<FormControl>
									<Textarea {...field}></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button className="w-full hover:cursor-pointer">ADD NOTE</Button>
			</form>
		</Form>
	);
};

export default HoldingNoteForm;
