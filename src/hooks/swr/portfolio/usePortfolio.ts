import { fetcher } from "@/libs/fetcher";
import { UserStockDetails } from "@/types/UserPortfolio.type";

import useSWR from "swr";

const usePortfolio = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: { success: boolean; data: UserStockDetails[] };
		isLoading: boolean;
		error: String | undefined;
	} = useSWR("/api/portfolio/get", fetcher, {
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

export default usePortfolio;
