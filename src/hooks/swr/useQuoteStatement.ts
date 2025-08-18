import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteStatement = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteStatement?ticker=${selectedQuote}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 0,
		}
	);

	return {
		data,
		isLoading,
		error,
	};
};

export default useQuoteStatement;
