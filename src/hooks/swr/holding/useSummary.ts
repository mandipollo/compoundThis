import { fetcher } from "@/libs/fetcher";
import { DailyTickerSummary } from "@/types/DailyTickerSummary.type";
import useSWR from "swr";

const useDailySummary = ({ ticker, date }: { ticker: string; date: Date }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: DailyTickerSummary };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(
		ticker ? `/api/holding/summary?ticker=${ticker}&date=${date}` : null,
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

export default useDailySummary;
