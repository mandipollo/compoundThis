import { testApiHandler } from "next-test-api-route-handler";
import { vi, expect, describe, afterEach, it } from "vitest";

import * as appHandler from "@/app/api/quote/quoteSearchSuggestions/route";

// clean all stub env used for test function each run
afterEach(() => {
	vi.unstubAllEnvs();
});

describe("handles quote search suggestions ", () => {
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
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");

		// mock fetch function to resolve into promise with given data to avoid calling the prod api
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: Promise.resolve({ success: false, error: "Ticker required" }),
				status: 422,
			})
		);
		await testApiHandler({
			appHandler,
			url: "?ticker=",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();

				expect(data).toStrictEqual({
					success: false,
					error: "Ticker required",
				});
			},
		});
	});

	it("should return Invalid ticker on 404 response from exterrnal api  ", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({ success: false, error: "Invalid ticker" }),
				status: 404,
			})
		);

		await testApiHandler({
			appHandler,
			url: "?ticker=INVALID",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();
				expect(data).toStrictEqual({ success: false, error: "Invalid ticker" });
			},
		});
	});

	it("should return valid data on success ", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({ success: true, data: { name: "Apple Inc" } }),
				status: 200,
			})
		);

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const data = await res.json();
				expect(data).toStrictEqual({
					success: true,
					data: { name: "Apple Inc" },
				});
			},
		});
	});
});
