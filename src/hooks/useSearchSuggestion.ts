"use client";
import { ApiResponse } from "@/types/ApiResponse.type";
import { SearchResultItem } from "@/types/Search.type";
import getErrorMessage from "@/utils/get-error-message";
import { useEffect, useState } from "react";

const useSearchSuggestion = ({ input }: { input: string }) => {
	const [error, setError] = useState<string>("");
	const [results, setResults] = useState<SearchResultItem[]>([]);
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

				console.log(data);

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
		};
	}, [input]);

	useEffect(() => {
		return () => setResults([]);
	}, [setResults]);

	return {
		results,
		error,
	};
};

export default useSearchSuggestion;
