"use client";

import React, { useEffect, useState } from "react";
import { Command } from "@/components/ui/command";

import SuggestionLists from "./SuggestionLists";
import { ResultItem } from "./searchQueryTypes";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
	const [hideCommandList, setHideCommandList] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const [results, setResults] = useState<ResultItem[]>([]);

	// focus input

	//
	useEffect(() => {
		if (!input) {
			return;
		}
		const getData = setTimeout(async () => {
			const res = await fetch(
				`/api/quote/quoteSearchSuggestions?ticker=${input}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			const data = await res.json();
			console.log(data);

			if (data.success) {
				setResults(data.data.data.results);
			}
		}, 2000);

		return () => clearTimeout(getData);
	}, [input]);

	return (
		<div className="flex flex-col gap-.5 max-w-2xl w-full ">
			<Input
				onFocus={() => setHideCommandList(false)}
				onBlur={() => setHideCommandList(true)}
				className={` outline-none shadow-md rounded-t-md focus:rounded-b-none `}
				placeholder="Search stocks, ETFs and much more..."
				value={input}
				onChange={e => setInput(e.target.value)}
			></Input>
			{results && results.length > 0 && (
				<Command
					className={`rounded-m rounded-t-none border shadow-md ${hideCommandList && "hidden"} `}
				>
					<SuggestionLists results={results} />
				</Command>
			)}
		</div>
	);
};

export default SearchBar;
