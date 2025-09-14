import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useUserStockTotalValue = () => {
	const { data, isLoading, error } = useSWR(
		"/api/user/stockTotalValue",
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 0,
		}
	);

	return { data, isLoading, error };
};

export default useUserStockTotalValue;
