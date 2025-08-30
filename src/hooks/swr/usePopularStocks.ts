import { fetcher } from "@/libs/fetcher";
import { PopularTickerData } from "@/types/Stock.type";
import useSWR from "swr";

const usePopularStocks = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: PopularTickerData[];
		isLoading: boolean;
		error: string | undefined;
	} = useSWR("/api/quote/popularStocks", fetcher, {
		refreshInterval: 0,
		revalidateOnFocus: true,
		revalidateOnReconnect: true,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default usePopularStocks;
