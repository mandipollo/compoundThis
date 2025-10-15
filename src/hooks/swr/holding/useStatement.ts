import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useHoldingStatement = (selectedQuote: string) => {
	const { data, error, isLoading } = useSWR(
		`/api/holding/statement?ticker=${selectedQuote}`,
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

export default useHoldingStatement;
