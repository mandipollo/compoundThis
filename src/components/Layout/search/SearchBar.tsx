"use client";

import { useEffect, useState } from "react";
//UI
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
//COMPONENTS
import SuggestionLists from "./SuggestionLists";
//TYPES
import { SearchResultItem } from "@/types/Search.type";
import { ApiResponse } from "@/types/ApiResponse.type";
//UTILS
import getErrorMessage from "@/utils/get-error-message";

const SearchBar = () => {
	const [hideCommandList, setHideCommandList] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const [results, setResults] = useState<SearchResultItem[]>([]);
	const [error, setError] = useState<string>("");

	// debounce api call 500ms
	useEffect(() => {
		if (!input) {
			setResults([]);
			return;
		}
		const delayDebounce = setTimeout(async () => {
			try {
				const res = await fetch(`/api/holding/suggestions?ticker=${input}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				const data: ApiResponse<SearchResultItem[]> = await res.json();

				if (!data.success) {
					setResults([]);
					throw new Error(data.error);
				}

				setResults(data.data);
			} catch (error) {
				const message = getErrorMessage(error);
				setError(message);
				console.log(message);
			}
		}, 400);

		return () => {
			clearTimeout(delayDebounce);
			setResults([]);
		};
	}, [input]);

	return (
		<div className="flex relative flex-col gap-.5 max-w-2xl w-full ">
			<Input
				onFocus={() => setHideCommandList(false)}
				onBlur={() => setHideCommandList(true)}
				className={` outline-none shadow-md rounded-t-md focus:rounded-b-none `}
				placeholder="Search stocks, ETFs and much more..."
				value={input}
				onChange={e => setInput(e.target.value)}
			></Input>
			{error && <span className="text-md text-red-500">{error}</span>}
			{results && results.length > 0 && (
				<Command
					className={`z-10 absolute top-10 left-0 h-60 rounded-m rounded-t-none border shadow-md ${hideCommandList && "hidden"} `}
				>
					<SuggestionLists results={results} />
				</Command>
			)}
		</div>
	);
};

export default SearchBar;
