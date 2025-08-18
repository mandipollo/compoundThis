import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteAbout = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteAbout?ticker=${selectedQuote}`,
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

export default useQuoteAbout;
