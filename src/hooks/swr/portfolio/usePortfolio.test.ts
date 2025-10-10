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
import usePortfolio from "./usePortfolio";
import { fetcher } from "@/libs/fetcher";

//

describe("Unit test useUserPortfolio swr hook", () => {
	const mockPortfolioData = "mock-data";
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

		const { result } = renderHook(() => usePortfolio());
		const { isLoading, data, error } = result.current;

		// Assert hook output
		expect(data).toBe("mock-data");
		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(`/api/user/portfolio`, fetcher, {
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			refreshInterval: 0,
		});
	});

	it("should render loading state when promise does not resolve", async () => {
		mockedUseSWR.mockReturnValue({
			error: undefined,
			isLoading: true,
			data: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => usePortfolio());
		const { error, isLoading, data } = result.current;

		expect(isLoading).toEqual(true);
		expect(error).toBe(undefined);
		expect(data).toBe(undefined);
	});

	it("should return data on success ", async () => {
		mockedUseSWR.mockReturnValue({
			isLoading: false,
			data: mockPortfolioData,
			error: undefined,
			isValidating: false,
			mutate: vi.fn(),
		} as SWRResponse<any, any>);

		const { result } = renderHook(() => usePortfolio());

		const { isLoading, error, data } = result.current;

		expect(isLoading).toBe(false);
		expect(error).toBe(undefined);
		expect(data).toStrictEqual(mockPortfolioData);
	});
});
