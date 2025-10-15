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
import usePopularStocks from "./usePopularStocks";

// mocked version
const mockedUseSWR = vi.mocked(useSWR);

describe("hook for fetching popular stocks ", () => {
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

		const { result } = renderHook(() => usePopularStocks());
		const { data, isLoading, error } = result.current;
		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(`/api/market/popular`, fetcher, {
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			refreshInterval: 0,
		});
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
		const { result } = renderHook(() => usePopularStocks());
		const { error, isLoading, data } = result.current;
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("should return correctly formatted data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: "mock-data",
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => usePopularStocks());
		const { error, isLoading, data } = result.current;
		expect(data).toEqual("mock-data");
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});
