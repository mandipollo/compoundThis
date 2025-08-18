import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteAbout = (selectedQuote: string) => {
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

export default useQuoteAbout;
