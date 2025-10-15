// mock

vi.mock("swr", () => {
	const mockedUseSWR = vi.fn();
	return {
		default: mockedUseSWR,
	};
});

const mockedUseSWR =
	vi.mocked<(key: string, fetch: typeof fetcher) => SWRResponse<any, any>>(
		useSWR
	);
// imports
import { renderHook } from "@testing-library/react";
import { vi, expect, describe, it, afterEach } from "vitest";
import useSWR, { SWRResponse } from "swr";
import useHoldingStatement from "./useStatement";
import { fetcher } from "@/libs/fetcher";

//

describe("quote statement hook", () => {
	const mockQuoteStatementData = {
		ticker: "AAPL",
		name: "Apple Inc.",
		marketCap: 3000000000000,
		peRatio: 23,
		pbRation: 24,
	};
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("calls useSWR with the correct API URL and fetcher", () => {
		// Arrange
		mockedUseSWR.mockReturnValue({
			data: "mock-data",
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		} as SWRResponse<any, any>);

		// Act
		const ticker = "AAPL";

		const { result } = renderHook(() => useHoldingStatement("AAPL"));
		const { isLoading, data, error } = result.current;

		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/holding/statement?ticker=${ticker}`,
			fetcher,
			{
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				refreshInterval: 0,
			}
		);
	});
	it("should return Ticker is required and must be string when invalid ticker", async () => {
		mockedUseSWR.mockReturnValue({
			error: "Ticker is required and must be string",
			isLoading: false,
			data: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		//

		const { result } = renderHook(() => useHoldingStatement(""));
		const { error, isLoading, data } = result.current;

		expect(error).toEqual("Ticker is required and must be string");
		expect(isLoading).toBe(false);
		expect(data).toBe(undefined);
	});

	it("should render loading state when promise does not resolve", async () => {
		mockedUseSWR.mockReturnValue({
			error: undefined,
			isLoading: true,
			data: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => useHoldingStatement("AAPL"));
		const { error, isLoading, data } = result.current;

		expect(isLoading).toEqual(true);
		expect(error).toBe(undefined);
		expect(data).toBe(undefined);
	});

	it("should return correctly formatted data on success ", async () => {
		mockedUseSWR.mockReturnValue({
			isLoading: false,
			data: mockQuoteStatementData,
			error: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => useHoldingStatement("AAPL"));

		const { isLoading, error, data } = result.current;

		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		expect(data).toStrictEqual(mockQuoteStatementData);
	});
});
