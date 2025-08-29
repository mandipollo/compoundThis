// mock setups
vi.mock("swr", () => {
	const mockedUseSWR = vi.fn();
	return {
		default: mockedUseSWR,
	};
});

// Imports after mocking
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { SWRResponse } from "swr";
import { vi, describe, it, expect } from "vitest";
import { fetcher } from "@/libs/fetcher";
import useMarketStatus from "./useMarketStatus";
import { MarketStatusData } from "@/types/Stock.type";

// mocked version
const mockedUseSWR = vi.mocked(useSWR);

describe("market status  ", () => {
	const mockMarketStatusData = {
		afterHours: true,
		earlyHours: false,
		exchanges: {
			nasdaq: "extended-hours",
			nyse: "extended-hours",
		},
		serverTime: "2018-08-20",
		market: "extended-hours",
	};
	it("calls useSWR with the correct API URL and fetcher", async () => {
		// Arrange
		mockedUseSWR.mockReturnValue({
			data: "mock-data",
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		} as unknown as SWRResponse);

		// Act

		const { result } = renderHook(() => useMarketStatus());
		const {
			data,
			isLoading,
			error,
		}: {
			data: MarketStatusData;
			isLoading: boolean;
			error: string | undefined;
		} = result.current;
		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/quote/marketStatus`,
			fetcher,
			{
				revalidateOnFocus: true,
				revalidateOnReconnect: true,
				refreshInterval: 30000,
			}
		);
	});
	//

	it("returns isloading on load stage", async () => {
		mockedUseSWR.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;
		const { result } = renderHook(() => useMarketStatus());
		const {
			error,
			isLoading,
			data,
		}: {
			data: MarketStatusData;
			isLoading: boolean;
			error: string | undefined;
		} = result.current;
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("should return correctly formatted data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: mockMarketStatusData,
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => useMarketStatus());
		const {
			error,
			isLoading,
			data,
		}: {
			data: MarketStatusData;
			isLoading: boolean;
			error: string | undefined;
		} = result.current;
		expect(data).toEqual(mockMarketStatusData);
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});
