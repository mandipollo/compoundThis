"use client";
import React, { useState } from "react";

// components
import SectionContainer from "@/components/Containers/SectionContainer";
import Container from "@/components/Containers/Container";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

// date needs to be formatted as the same as server and client to resolve hydration issues
import { format } from "date-fns";
const formSchema = z.object({
	portfolioName: z
		.string()
		.min(2, {
			message: "Portfolio name must be atleast 2 charaters.",
		})
		.max(5),
	residency: z.string().min(2, { message: "Tax residency required." }),
	financialTerm: z.string().date(),
});

const CreatePortfolioPage = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date | undefined>(new Date());

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			portfolioName: "",
			residency: "United Kingdom",
			financialTerm: "01-04-2024",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {};

	return (
		<SectionContainer>
			<Container>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
						<FormField
							control={form.control}
							name="portfolioName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Portfolio name</FormLabel>
									<FormControl>
										<Input {...field} className="max-w-md" />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="residency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tax residency of portfolio</FormLabel>
									<FormControl>
										<Select {...field}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="United Kingdom">
													United Kingdom
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="financialTerm"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Financial year end of date</FormLabel>
									<FormControl>
										<div className="flex flex-col gap-3">
											<Popover open={open} onOpenChange={setOpen}>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														id="date"
														className="w-48 justify-between font-normal"
													>
														{date ? format(date, "dd/mm/yyyy") : "01-04-2024"}
														<ChevronDownIcon />
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto overflow-hidden p-0"
													align="start"
												>
													<Calendar
														{...field}
														mode="single"
														selected={date}
														captionLayout="dropdown"
														onSelect={date => {
															setDate(date);
															setOpen(false);
														}}
													/>
												</PopoverContent>
											</Popover>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="text-xs " type="submit">
							Create portfolio
						</Button>
					</form>
				</Form>
			</Container>
		</SectionContainer>
	);
};

export default CreatePortfolioPage;
