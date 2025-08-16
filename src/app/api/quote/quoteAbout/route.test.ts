/* File: test/unit.test.ts */

import { testApiHandler } from "next-test-api-route-handler"; // ◄ Must be first import
import { it, describe, expect, vi, beforeEach, afterEach } from "vitest";
// Import the handler under test from the app directory
import * as appHandler from "@/app/api/quote/quoteAbout/route";

afterEach(() => {
	vi.unstubAllEnvs();
});

describe("quote about api route", () => {
	//
	it("should return Server error on unresponsive server", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");
		await testApiHandler({
			appHandler,

			url: "?ticker=",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });

				const jsonBody = await res.json();
				expect(jsonBody).toStrictEqual({
					success: false,
					error: "Server error",
				});
			},
		});
	});

	//
	it("should return Ticker is required on missing ticker", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");
		await testApiHandler({
			appHandler,

			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const jsonBody = await res.json();
				expect(jsonBody).toStrictEqual({
					success: false,
					error: "Ticker is required",
				});
			},
		});
	});

	it("should return Ticker not found on 404", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ error: "Ticker not found" }),
				status: 404,
			})
		);
		await testApiHandler({
			appHandler,
			url: "?ticker=INVALID",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const jsonBody = await res.json();
				expect(jsonBody).toStrictEqual({
					error: "Ticker not found",
					success: false,
				});
			},
		});
	});

	it("should return quote data on a valid ticker", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "http://localhost:8080");

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({ data: { name: "Apple Inc." }, success: true }),
				status: 200,
			})
		);
		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const jsonBody = await res.json();
				expect(jsonBody).toStrictEqual({
					success: true,
					data: { name: "Apple Inc." },
				});
			},
		});
	});
});
