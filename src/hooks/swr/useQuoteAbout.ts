import { fetcher } from "@/libs/fetcher";
import { AboutData } from "@/types/Stock.type";
import useSWR from "swr";

const useQuoteAbout = (selectedQuote: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: AboutData };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(`/api/quote/quoteAbout?ticker=${selectedQuote}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useQuoteAbout;
