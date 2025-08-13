import { testApiHandler } from "next-test-api-route-handler"; // ◄ Must be first import
import { vi, it, describe, afterEach, expect } from "vitest";

import * as appHandler from "@/app/api/quote/quoteFundamental/route";

afterEach(() => {
	vi.unstubAllEnvs();
});

describe("handle fundamental quote data", () => {
	//
	it("returns server error on unresponsive server", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");
		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const response = await res.json();

				expect(response).toStrictEqual({
					success: false,
					error: "Server error",
				});
			},
		});
	});

	//

	it("returns Ticker is required on missing ticker", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({ error: "Ticker is required", success: false }),
				status: 422,
			})
		);

		await testApiHandler({
			appHandler,
			url: "?ticker=",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const response = await res.json();

				expect(response).toStrictEqual({
					success: false,
					error: "Ticker is required",
				});
			},
		});
	});

	it("returns Invalid ticker on 404 response from external api ", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({ error: "Invalid ticker", success: false }),
				status: 404,
			})
		);

		await testApiHandler({
			appHandler,
			url: "?ticker=INVALID",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const response = await res.json();

				expect(response).toStrictEqual({
					success: false,
					error: "Invalid ticker",
				});
			},
		});
	});

	// status 200

	it("returns data on success ", async () => {
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
				const res = await fetch({
					method: "Get",
				});
				const response = await res.json();
				expect(response).toStrictEqual({
					success: true,
					data: { name: "Apple Inc" },
				});
			},
		});
	});
});
