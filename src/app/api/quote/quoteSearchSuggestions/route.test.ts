// mock

vi.stubGlobal("fetch", vi.fn());
const mockedFetch = vi.mocked(fetch);

// imports
import { testApiHandler } from "next-test-api-route-handler";
import { vi, expect, describe, afterEach, it } from "vitest";

import * as appHandler from "./route";
import {
	SearchResultItem,
	SearchSuggestionResponse,
} from "@/types/FinancialStatement.type";

describe("handles quote search suggestions ", () => {
	//

	const mockServer = "http://localhost:8080";
	it("should return Server error on unresponsive server", async () => {
		// set server env to be empty , next js automatically loads env from .env.test file
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();

				expect(data).toStrictEqual({ success: false, error: "Server error" });
			},
		});
	});

	it("should return Ticker required on missing ticker", async () => {
		// set server env to be empty , next js automatically loads env from .env.test file
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			url: "?ticker=",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();

				expect(data).toStrictEqual({
					success: false,
					error: "Ticker is required",
				});
			},
		});
	});

	it("should return valid data on success ", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");
		mockedFetch.mockResolvedValue({
			ok: true,
			json: () =>
				Promise.resolve({ data: { some: "raw-data" }, success: true }),
			status: 200,
		} as unknown as Response);

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();
				expect(data).toStrictEqual({
					success: true,
					data: { some: "raw-data" },
				});
			},
		});
	});
});
