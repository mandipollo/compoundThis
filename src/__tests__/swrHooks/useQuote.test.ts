import { vi, describe, it, expect } from "vitest";
import { SWRResponse } from "swr";
import { fetcher } from "@/libs/fetcher";
// mock setups
vi.mock("swr", () => {
	const mockedUseSWR = vi.fn();
	return {
		default: mockedUseSWR,
	};
});

// Imports after mocking
import useSWR from "swr";

// mocked version
const mockedUseSWR = vi.mocked(useSWR);

// actual module

const { useQuoteAbout } = await vi.importActual<
	typeof import("@/hooks/useQuoteData")
>("@/hooks/useQuoteData");

const { useQuoteFundamental } = await vi.importActual<
	typeof import("@/hooks/useQuoteData")
>("@/hooks/useQuoteData");
///
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
		const ticker = "AAPL";
		const result = useQuoteAbout(ticker);

		// Assert hook output
		expect(result.data).toBe("mock-data");

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/quote/quoteAbout?ticker=${ticker}`,
			fetcher
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

		const { data, error, isLoading } = useQuoteAbout("AAPL");
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

		const { data, error, isLoading } = useQuoteAbout("AAPL");
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("returns predictable data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: mockQuoteAboutData,
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { data, error, isLoading } = useQuoteAbout("AAPL");

		expect(data).toEqual(mockQuoteAboutData);
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});

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
		const result = useQuoteFundamental(ticker);

		// Assert hook output
		expect(result.data).toBe("mock-data");

		// Assert useSWR call
		expect(mockedUseSWR).toHaveBeenCalledWith(
			`/api/quote/quoteFundamental?ticker=${ticker}`,
			fetcher
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

		const { data, error, isLoading } = useQuoteFundamental("AAPL");
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

		const { data, error, isLoading } = useQuoteFundamental("AAPL");
		expect(data).toBeUndefined();
		expect(error).toBeUndefined();
		expect(isLoading).toBe(true);
	});

	// success

	it("returns predictable data on success", async () => {
		mockedUseSWR.mockReturnValue({
			data: mockQuoteFundamentalData,
			isLoading: false,
			error: undefined,
			mutate: vi.fn(),
			isValidating: false,
		}) as unknown as SWRResponse;

		const { data, error, isLoading } = useQuoteFundamental("AAPL");

		expect(data).toEqual(mockQuoteFundamentalData);
		expect(error).toBeUndefined();
		expect(isLoading).toBe(false);
	});
});
