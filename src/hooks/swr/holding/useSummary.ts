import { fetcher } from "@/libs/fetcher";
import { Summary } from "@/types/Summary.type";
import useSWR from "swr";

const useSummary = ({ ticker }: { ticker: string }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: Summary };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(ticker ? `/api/holding/summary?ticker=${ticker}` : null, fetcher, {
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

export default useSummary;
