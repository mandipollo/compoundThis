import { fetcher } from "@/libs/fetcher";
import { AboutData } from "@/types/CompanyAbout.type";
import useSWR from "swr";

const useAbout = (selectedQuote: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: AboutData };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(`/api/holding/about?ticker=${selectedQuote}`, fetcher, {
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

export default useAbout;
