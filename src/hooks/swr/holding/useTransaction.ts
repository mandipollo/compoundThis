import { fetcher } from "@/libs/fetcher";
import { Transaction } from "@/types/UserPortfolio.type";
import useSWR from "swr";
const useTransaction = ({ ticker }: { ticker: string }) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: Transaction[] };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(
		ticker ? `/api/holding/getTransaction?ticker=${ticker}` : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 0,
		},
	);
	return {
		data,
		isLoading,
		error,
	};
};
export default useTransaction;
