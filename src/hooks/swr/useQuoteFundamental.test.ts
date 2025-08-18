// mock setups
vi.mock("swr", () => {
	const mockedUseSWR = vi.fn();
	return {
		default: mockedUseSWR,
	};
});

const mockedUseSWR = vi.mocked(useSWR);
// Imports after mocking
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import { vi, describe, it, expect } from "vitest";
import { SWRResponse } from "swr";
import { fetcher } from "@/libs/fetcher";
import useQuoteFundamental from "./useQuoteFundamental";

describe("Quote fundamental  ", () => {
	const mockQuoteFundamentalData = {
		ticker: "AAPL",
		name: "Apple Inc.",
		marketCap: 3000000000000,
		peRatio: 23,
		pbRation: 24,
	};
	it("calls useSWR with the correct API URL and fetcher", () => {
		// Arrange
		mockedUseSWR.mockReturnValue({
			data: "mock-data",
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		} as unknown as SWRResponse);

		// Act
		const ticker = "AAPL";
		const { result } = renderHook(() => useQuoteFundamental(ticker));
		const { error, isLoading, data } = result.current;

		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/quote/quoteFundamental?ticker=${ticker}`,
			fetcher,
			{
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				refreshInterval: 0,
			}
		);
	});
	//
	it("returns on error on invalid ticker", async () => {
		mockedUseSWR.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: "Ticker required",
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => useQuoteFundamental("AAPL"));
		const { error, isLoading, data } = result.current;
		expect(data).toBeUndefined();
		expect(error).toBe("Ticker required");
		expect(isLoading).toBe(false);
	});
	it("returns isloading on load stage", async () => {
		mockedUseSWR.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => useQuoteFundamental("AAPL"));
		const { error, isLoading, data } = result.current;
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("returns correctly formatted data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: mockQuoteFundamentalData,
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => useQuoteFundamental("AAPL"));
		const { error, isLoading, data } = result.current;

		expect(data).toEqual(mockQuoteFundamentalData);
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});
