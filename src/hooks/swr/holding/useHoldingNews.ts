import { fetcher } from "@/libs/fetcher";
import { NewsApiResponse } from "@/types/NewsApiResponse.type";
import useSWR from "swr";

const useHoldingNews = (holding: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: {
			success: boolean;
			data: NewsApiResponse;
		};
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(`/api/holding/news?ticker=${holding}`, fetcher, {
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

export default useHoldingNews;
