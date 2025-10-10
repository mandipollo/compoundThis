import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useHolding = ({ ticker }: { ticker: String }) => {
	const { error, data, isLoading } = useSWR(
		`/api/holding/get?ticker=${ticker}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			refreshInterval: 0,
		}
	);

	return { data, error, isLoading };
};

export default useHolding;
