import { fetcher } from "@/libs/fetcher";
import { PopularTickerData } from "@/types/PopularTickers.type";
import useSWR from "swr";

const usePopularStocks = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: { success: boolean; data: PopularTickerData };
		isLoading: boolean;
		error: string | undefined;
	} = useSWR("/api/quote/popularStocks", fetcher, {
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default usePopularStocks;
