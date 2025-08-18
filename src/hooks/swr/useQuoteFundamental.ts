import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useQuoteFundamental = (selectedQuote: string) => {
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
export default useQuoteFundamental;
