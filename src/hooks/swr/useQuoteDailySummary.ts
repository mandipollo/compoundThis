import { fetcher } from "@/libs/fetcher";
import { DailyTickerSummary } from "@/types/DailyTickerSummary.type";
import useSWR from "swr";

const useQuoteDailySummary = (selectedQuote: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: DailyTickerSummary };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(`/api/quote/quoteDailySummary?ticker=${selectedQuote}`, fetcher, {
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

export default useQuoteDailySummary;
