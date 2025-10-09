import { fetcher } from "@/libs/fetcher";
import { HoldingAllocation } from "@/types/HoldingAllocation.type";
import useSWR from "swr";

const useHoldingAllocation = (holding: string) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: HoldingAllocation[] };
		error: string | undefined;
		isLoading: boolean;
	} = useSWR(
		`/api/user/holdingPortfolioAllocation?holding=${holding}`,
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

export default useHoldingAllocation;
