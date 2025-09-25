import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useUserStockTotalValue = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: {
			success: true;
			data: { totalQuantity: number; totalValue: number };
		};
		isLoading: boolean;
		error: string | undefined;
	} = useSWR("/api/user/stockTotalValue", fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	});

	return { data, isLoading, error };
};

export default useUserStockTotalValue;
