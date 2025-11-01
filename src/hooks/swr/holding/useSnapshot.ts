import { fetcher } from "@/libs/fetcher";
import { SingleTickerResponse } from "@/types/TickerSnapshot.type";

import useSWR from "swr";

const useSnapshot = ({ ticker }: { ticker: string }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: SingleTickerResponse };
		isLoading: boolean;
		error: string | undefined;
	} = useSWR(
		ticker ? `/api/holding/snapshot?ticker=${ticker}` : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 0,
		}
	);

	return {
		data,
		isLoading,
		error,
	};
};

export default useSnapshot;
