import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { MarketStatusData } from "@/types/Stock.type";

const useMarketStatus = () => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: MarketStatusData };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR("/api/quote/marketStatus", fetcher, {
		revalidateOnFocus: true,
		revalidateOnReconnect: true,
		refreshInterval: 30000,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useMarketStatus;
