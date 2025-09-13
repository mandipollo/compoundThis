import { fetcher } from "@/libs/fetcher";

import useSWR from "swr";

const useUserPortfolios = () => {
	const { data, isLoading, error } = useSWR("/api/user/portfolio", fetcher, {
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
