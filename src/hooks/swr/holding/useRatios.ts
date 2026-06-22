import { fetcher } from "@/libs/fetcher";
import { Ratios } from "@/types/Ratios.type";

import useSWR from "swr";

const useRatios = ({ ticker }: { ticker: string }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: Ratios };
		isLoading: boolean;
		error: string | undefined;
	} = useSWR(ticker ? `/api/holding/ratios?ticker=${ticker}` : null, fetcher, {
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

export default useRatios;
