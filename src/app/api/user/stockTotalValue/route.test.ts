// mock

vi.stubGlobal("fetch", vi.fn());
const mockedFetch = vi.mocked(fetch);

vi.mock("@/utils/jwt-verifier", () => ({
	verifyJWT: vi.fn(),
}));
const mockedJWTVerifier = vi.mocked(verifyJWT);

vi.mock("next/headers", () => ({
	cookies: vi.fn(),
}));
const mockedCookies = vi.mocked(cookies);
// imports
import { testApiHandler } from "next-test-api-route-handler"; // ◄ Must be first import
import { it, describe, expect, vi, beforeEach } from "vitest";
import { cookies } from "next/headers";

// Import the handler under test from the app directory
import * as appHandler from "./route";
import { verifyJWT } from "@/utils/jwt-verifier";

describe("Add stock to portfolio api route", () => {
	const mockServer = "http://localhost:8080";
	beforeEach(() => {
		vi.resetAllMocks();
		vi.unstubAllEnvs();
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

	it("should return error when JWT verification fails", async () => {
		vi.mock("next/headers", () => ({
			cookies: vi.fn(),
		}));

		(mockedJWTVerifier as any).mockResolvedValueOnce({
			success: false,
			payload: null,
			error: "Invalid token",
		});
		(mockedCookies as any).mockResolvedValueOnce({
			get: (key: string) =>
				key === "idToken"
					? { name: "idToken", value: "Invalid token" }
					: undefined,
		});

		(mockedFetch as any).mockResolvedValueOnce({
			json: async () => ({ success: false, error: "Invalid token" }),
		});

		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "GET",
				});

				expect(res.status).toBe(401);
				const jsonBody = await res.json();
				expect(jsonBody).toEqual({
					success: false,
					error: "Invalid token",
				});
			},
		});
	});

	it("shoudl return error when no auth token provided", async () => {
		vi.mock("next/headers", () => ({
			cookies: vi.fn(),
		}));

		(mockedJWTVerifier as any).mockResolvedValueOnce({
			success: false,
			payload: null,
			error: "Missing token",
		});
		(mockedCookies as any).mockResolvedValueOnce({
			get: () => undefined,
		});

		(mockedFetch as any).mockResolvedValueOnce({
			json: async () => ({ success: false, error: "Missing token" }),
		});

		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "GET",
				});

				expect(res.status).toBe(401);
				const jsonBody = await res.json();
				expect(jsonBody).toEqual({
					success: false,
					error: "Missing token",
				});
			},
		});
	});

	it("should forward request to express backend with correct auth", async () => {
		/// mocks

		(mockedJWTVerifier as any).mockResolvedValueOnce({
			success: true,
			payload: { sub: "mocked-id" },
			error: null,
		});
		(mockedCookies as any).mockResolvedValueOnce({
			get: (key: string) =>
				key === "idToken" ? { name: "idToken", value: "mocked-id" } : undefined,
		});
		(mockedFetch as any).mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => ({ success: true, data: { data: "raw-data" } }),
		});

		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer mocked-id`,
					},
				});
				const jsonBody = await res.json();

				//  assert that handler called fetch with correct URL and headers
				expect(mockedFetch).toHaveBeenCalledWith(
					`${mockServer}/user/getUserStockTotalValue`,
					expect.objectContaining({
						headers: {
							Authorization: "Bearer mocked-id",
						},
						method: "GET",
					})
				);
				expect(jsonBody).toStrictEqual({
					data: { data: "raw-data" },
					success: true,
				});
			},
		});
	});
});
