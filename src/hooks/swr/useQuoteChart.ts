import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteChart = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteChart?ticker=${selectedQuote}`,
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

export default useQuoteChart;
