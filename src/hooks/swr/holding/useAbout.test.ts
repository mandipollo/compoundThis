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
import { vi, describe, it, expect } from "vitest";
import { SWRResponse } from "swr";
import { fetcher } from "@/libs/fetcher";
import useAbout from "./useAbout";

// mocked version
const mockedUseSWR = vi.mocked(useSWR);

describe("Quote hooks ", () => {
	const mockQuoteAboutData = {
		ticker: "AAPL",
		name: "Apple Inc.",
		marketCap: 3000000000000,
		description: "Apple Inc. designs and manufactures consumer electronics.",
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

		const { result } = renderHook(() => useAbout("AAPL"));
		const { error, isLoading, data } = result.current;
		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/holding/about?ticker=AAPL`,
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

		const { result } = renderHook(() => useAbout("AAPL"));
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
		const { result } = renderHook(() => useAbout("AAPL"));
		const { error, isLoading, data } = result.current;
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("should return correctly formatted data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: mockQuoteAboutData,
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { result } = renderHook(() => useAbout("AAPL"));
		const { error, isLoading, data } = result.current;
		expect(data).toEqual(mockQuoteAboutData);
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});
