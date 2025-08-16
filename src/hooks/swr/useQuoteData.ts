import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
export const useQuoteFundamental = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteFundamental?ticker=${selectedQuote}`,
		fetcher
	);

	return {
		data,
		isLoading,
		error,
	};
};

export const useQuoteAbout = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteAbout?ticker=${selectedQuote}`,
		fetcher
	);

	return {
		data,
		isLoading,
		error,
	};
};
