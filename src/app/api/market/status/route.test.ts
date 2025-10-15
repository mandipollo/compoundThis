// mock

vi.stubGlobal("fetch", vi.fn());
const mockFetch = vi.mocked(fetch);

// imports
import { testApiHandler } from "next-test-api-route-handler"; // ◄ Must be first import
import { it, describe, expect, vi, beforeEach } from "vitest";
// Import the handler under test from the app directory
import * as appHandler from "./route";

describe("market api route", () => {
	const mockServer = "http://localhost:8080";
	beforeEach(() => {
		vi.resetAllMocks();
	});

	//
	it("should return Server error on unresponsive server", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");
		await testApiHandler({
			appHandler,
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

	it("should return market status on success", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		mockFetch.mockResolvedValue({
			ok: true,
			json: () =>
				Promise.resolve({ data: { some: "raw-data" }, success: true }),
			status: 200,
		} as unknown as Response);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({ method: "GET" });
				const jsonBody = await res.json();
				expect(jsonBody).toStrictEqual({
					success: true,
					data: { some: "raw-data" },
				});
			},
		});
	});
});
