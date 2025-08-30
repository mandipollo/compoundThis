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
import useTopMarketMovers from "./useTopMarketMovers";
import { fetcher } from "@/libs/fetcher";

//

describe("Top market movers hook", () => {
	const mockQuoteStatementData = "mock-data";
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

		const { result } = renderHook(() => useTopMarketMovers());
		const { isLoading, data, error } = result.current;

		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/quote/topGainers`,
			fetcher,
			{
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				refreshInterval: 0,
			}
		);
	});

	it("should render loading state when promise does not resolve", async () => {
		mockedUseSWR.mockReturnValue({
			error: undefined,
			isLoading: true,
			data: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => useTopMarketMovers());
		const { error, isLoading, data } = result.current;

		expect(isLoading).toEqual(true);
		expect(error).toBe(undefined);
		expect(data).toBe(undefined);
	});

	it("should return data on success ", async () => {
		mockedUseSWR.mockReturnValue({
			isLoading: false,
			data: mockQuoteStatementData,
			error: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => useTopMarketMovers());

		const { isLoading, error, data } = result.current;

		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		expect(data).toStrictEqual(mockQuoteStatementData);
	});
});
