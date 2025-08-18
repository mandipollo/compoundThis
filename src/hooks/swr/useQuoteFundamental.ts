import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteFundamental = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/quote/quoteFundamental?ticker=${selectedQuote}`,
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
export default useQuoteFundamental;
