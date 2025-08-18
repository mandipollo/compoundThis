import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteStatement = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteStatement?ticker=${selectedQuote}`,
		fetcher
	);

	return {
		data,
		isLoading,
		error,
	};
};

export default useQuoteStatement;
