import { fetcher } from "@/libs/fetcher";
import { Holding } from "@/types/Holding.type";
import useSWR from "swr";

const useHolding = ({ ticker }: { ticker: String }) => {
	const {
		error,
		data,
		isLoading,
	}: {
		error: string | undefined;
		data: { success: boolean; data: Holding };
		isLoading: boolean;
	} = useSWR(`/api/holding/get?ticker=${ticker}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		refreshInterval: 0,
	});

	return { data, error, isLoading };
};

export default useHolding;
