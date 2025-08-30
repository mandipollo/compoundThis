import { fetcher } from "@/libs/fetcher";
import { TopMarketMoversTickerData } from "@/types/Stock.type";
import useSWR from "swr";

const useTopMarketMovers = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: TopMarketMoversTickerData[];
		isLoading: boolean;
		error: string | undefined;
	} = useSWR("/api/quote/topGainers", fetcher, {
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

export default useTopMarketMovers;
