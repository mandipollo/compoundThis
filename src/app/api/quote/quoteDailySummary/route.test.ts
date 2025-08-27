// mock

vi.stubGlobal("fetch", vi.fn());
const mockedFetch = vi.mocked(fetch);

// imports

import { testApiHandler } from "next-test-api-route-handler";
import { vi, expect, it, beforeEach, describe } from "vitest";

// import route
import * as appHandler from "./route";

describe("quote daily summary api handler route", () => {
	const mockServer = "http://localhost:8080";

	beforeEach(() => {
		vi.resetAllMocks();
	});

	//

	it("should return Server error on unresponsive server", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", "");

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
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

	it("should return Ticker is required on missing ticker", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			url: "?ticker=",
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

	// success scenario

	it("should return correctly formatted data ", async () => {
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		// promise to resolve

		mockedFetch.mockResolvedValue({
			ok: true,
			status: 200,
			json: () =>
				Promise.resolve({ success: true, data: { some: "raw-data" } }),
		} as unknown as Response);

		// api handler

		await testApiHandler({
			appHandler,
			url: "?ticker=AAPL",
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
