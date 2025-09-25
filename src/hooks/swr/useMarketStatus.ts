import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { MarketStatusData } from "@/types/MarketStatus.type";

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
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		refreshInterval: 0,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useMarketStatus;
