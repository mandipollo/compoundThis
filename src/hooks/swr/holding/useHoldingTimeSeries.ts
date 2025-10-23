import { fetcher } from "@/libs/fetcher";
import { timeSeriesChartData } from "@/types/UserPortfolio.type";

import useSWR from "swr";

const useHoldingTimeSeries = ({
	holding,
	timeRange,
}: {
	holding: string;
	timeRange: string;
}) => {
	const {
		data,
		error,
		isLoading,
	}: {
		data: { success: boolean; data: timeSeriesChartData[] };
		isLoading: boolean;
		error: string | undefined;
	} = useSWR(
		`/api/holding/getTimeSeries?holding=${holding}&timeRange=${timeRange}`,
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

export default useHoldingTimeSeries;
