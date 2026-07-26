import { fetcher } from "@/libs/fetcher";
import { Transaction } from "@/types/UserPortfolio.type";
import useSWR from "swr";
const useTransactions = ({ ticker }: { ticker: string }) => {
	const { data, error, isLoading, mutate } = useSWR<{
		success: boolean;
		data: Transaction[];
	}>(ticker ? `/api/holding/getTransactions?ticker=${ticker}` : null, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	});
	return {
		data,
		isLoading,
		error,
		mutate,
	};
};
export default useTransactions;
