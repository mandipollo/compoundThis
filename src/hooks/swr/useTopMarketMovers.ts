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
	} = useSWR("/api/quote/topGainers", fetcher);

	return {
		data,
		isLoading,
		error,
	};
};
