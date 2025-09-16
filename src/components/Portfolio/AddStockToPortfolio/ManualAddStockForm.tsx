"use client";
import React, { useState } from "react";

// ui
import { Command } from "../../ui/command";
import { Separator } from "../../ui/separator";
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
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { z } from "zod";

// Types
import { SearchResultItem } from "@/types/Stock.type";

// Components
import StockSuggestionLists from "./StockSuggestionList";
import SelectedStockDisplay from "./SelectedStockDisplay";

// Hooks
import useStockSuggestion from "@/hooks/useStockSuggestion";

// date needs to be formatted as the same as server and client to resolve hydration issues
import { format } from "date-fns";

const formSchema = z.object({
	stock: z
		.string()
		.min(2, {
			message: "Invalid name or ticker symbol",
		})
		.max(10),
	tradeDate: z.date(),
	quantity: z.number(),
	price: z.number(),
});

//TODO:SEARCH COMPANY SUGGESTION
const ManualAddStockForm = () => {
	// popover
	const [open, setOpen] = useState<boolean>(false);
	const [hideCommandList, setHideCommandList] = useState<boolean>(false);

	// selected stock
	const [selectedStock, setSelectedStock] = useState<SearchResultItem | null>(
		null
	);

	// Forms

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tradeDate: undefined,
			quantity: 1,
			price: 0,
			stock: "",
		},
	});

	// watch the stock value to call suggestions
	const input = useWatch({
		control: form.control,
		name: "stock",
	});

	const stockPrice = useWatch({
		control: form.control,
		name: "price",
	});
	const quantityStock = useWatch({
		control: form.control,
		name: "quantity",
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const stockData = {
				quantity: values.quantity,
				companyName: selectedStock?.name,
				ticker: selectedStock?.ticker,
				buyPrice: values.price,
				buyDate: values.tradeDate,
			};
			const response = await fetch("/api/user/addStockToPortfolio", {
				method: "POST",
				body: JSON.stringify(stockData),
			});
			const data = await response.json();
			console.log(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	// search suggestion list hook
	const { results, error } = useStockSuggestion({ input });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex relative flex-col gap-4 w-full max-w-xl bg-white px-4 py-6 rounded-md shadow-md"
			>
				<div className="flex relative w-full flex-col">
					<FormField
						control={form.control}
						name="stock"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Search by company name or code</FormLabel>
								<FormControl>
									<Input
										onFocus={() => setHideCommandList(false)}
										value={field.value}
										onChange={e => field.onChange(e.target.value)}
										onBlur={() => setHideCommandList(true)}
										className=" outline-none shadow-md rounded-t-md focus:rounded-b-none "
										placeholder="Search stocks, ETFs and much more..."
									></Input>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{results && results.length > 0 && (
						<Command
							className={`z-10 absolute top-16 left-0 h-60 rounded-m rounded-t-none border shadow-md ${hideCommandList && "hidden"} `}
						>
							<StockSuggestionLists
								setSelectedStock={setSelectedStock}
								results={results}
							/>
						</Command>
					)}
				</div>
				<SelectedStockDisplay selectedStock={selectedStock} />
				{selectedStock && <Separator />}

				<FormField
					control={form.control}
					name="tradeDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Trade date</FormLabel>
							<FormControl>
								<div className="flex flex-col gap-3">
									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												id="date"
												className="w-full justify-between font-normal"
											>
												{field.value
													? format(field.value, "dd/MM/yyyy")
													: "Select a date"}
												<ChevronDownIcon />
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto overflow-hidden p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={e => field.onChange(e)}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									value={field.value}
									onChange={e => field.onChange(Number(e.target.value))}
									type="number"
									className=" w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit/share price</FormLabel>
							<FormControl>
								<Input
									value={field.value}
									type="number"
									onChange={e => field.onChange(Number(e.target.value))}
									className=" w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row items-center justify-between">
					<span>Total</span>
					<span>GB£ {Number(stockPrice) * Number(quantityStock)}</span>
				</div>
				<Button variant="ghost" className="w-full hover:cursor-pointer border">
					CANCEL
				</Button>
				<Button className="w-full hover:cursor-pointer">ADD</Button>
			</form>
		</Form>
	);
};

export default ManualAddStockForm;
