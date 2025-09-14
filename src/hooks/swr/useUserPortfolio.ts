import { fetcher } from "@/libs/fetcher";
import { UserPortfolio } from "@/types/User.type";

import useSWR from "swr";

const useUserPortfolios = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		data: { success: boolean; data: UserPortfolio };
		isLoading: boolean;
		error: String | undefined;
	} = useSWR("/api/user/portfolio", fetcher, {
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

export default useUserPortfolios;
