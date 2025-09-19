import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

const useIndividualStockPortfolio = ({ ticker }: { ticker: String }) => {
	const { error, data, isLoading } = useSWR(
		`/api/user/getStock?ticker=${ticker}`,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			refreshInterval: 0,
		}
	);

	return { data, error, isLoading };
};

export default useIndividualStockPortfolio;
