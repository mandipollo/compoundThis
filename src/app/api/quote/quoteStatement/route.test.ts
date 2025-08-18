import { testApiHandler } from "next-test-api-route-handler";
import { vi, expect, describe, afterEach, it } from "vitest";

import * as appHandler from "./route";

describe("quote statement api route", () => {
	const mockServer = "mock-server";
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
		vi.unstubAllGlobals();
	});

	it("should return Server error on unresponsive server", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const response = await fetch({ method: "GET" });

				expect(response.ok).toBe(false);
				expect(response.status).toBe(500);
				const data = await response.json();

				expect(data).toStrictEqual({
					success: false,
					error: "Server error",
				});
			},
		});
	});
	it("should return Ticker is required and must be string on invalid ticker", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			url: "?ticker=",
			test: async ({ fetch }) => {
				const response = await fetch({ method: "GET" });

				expect(response.ok).toBe(false);
				expect(response.status).toBe(400);

				const data = await response.json();

				expect(data.error).toEqual("Ticker is required and must be string");
				expect(data.success).toBe(false);
			},
		});
	});

	it("should return Invalid ticker on 404", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						error: "Invalid ticker",
						success: false,
					}),
				status: 404,
				ok: false,
			})
		);

		await testApiHandler({
			appHandler,
			url: "?ticker=INVALID",
			test: async ({ fetch }) => {
				const response = await fetch({ method: "GET" });

				expect(response.ok).toBe(false);
				expect(response.status).toBe(404);

				const data = await response.json();

				expect(data.error).toEqual("Invalid ticker");
				expect(data.success).toBe(false);
			},
		});
	});

	it("should return correctly formatted data and status on success", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValueOnce({
				json: async () =>
					Promise.resolve({ data: { balance: 123 }, success: true }),
				status: 200,
				ok: true,
			})
		);
		//

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
			test: async ({ fetch }) => {
				const response = await fetch({ method: "GET" });

				expect(response.ok).toBe(true);
				expect(response.status).toBe(200);

				const data = await response.json();

				expect(data.success).toBe(true);
				expect(data.data).toEqual({
					balance: 123,
				});
			},
		});
	});
});
