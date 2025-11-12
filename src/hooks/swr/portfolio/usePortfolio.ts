import { fetcher } from "@/libs/fetcher";
import { UserStock } from "@/types/UserPortfolio.type";

import useSWR from "swr";

const usePortfolio = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: { success: boolean; data: UserStock[] };
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
