// mock

vi.stubGlobal("fetch", vi.fn());
const mockedFetch = vi.mocked(fetch);

vi.mock("@/utils/jwt-verifier", () => ({
	verifyJWT: vi.fn(),
}));
const mockedJWTVerifier = vi.mocked(verifyJWT);

// imports
import { testApiHandler } from "next-test-api-route-handler"; // ◄ Must be first import
import { it, describe, expect, vi, beforeEach } from "vitest";

// Import the handler under test from the app directory
import * as appHandler from "./route";
import { verifyJWT } from "@/utils/jwt-verifier";

describe("Init user portfolio ", () => {
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
		(mockedJWTVerifier as any).mockResolvedValueOnce({
			success: false,
			payload: null,
			error: "Invalid token",
		});

		(mockedFetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ stock: "AAPL" }),
		});
		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer Invalid-token`,
					},
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

	it("should return error when no auth token provided", async () => {
		(mockedJWTVerifier as any).mockResolvedValueOnce({
			success: false,
			payload: null,
			error: "Invalid Authorization header format",
		});

		(mockedFetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				success: false,
				error: "Invalid Authorization header format",
			}),
		});

		vi.stubEnv("NEXT_PUBLIC_LOCAL_BASE_SERVER", mockServer);

		await testApiHandler({
			appHandler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer `,
					},
				});

				expect(res.status).toBe(401);
				const jsonBody = await res.json();
				expect(jsonBody).toEqual({
					success: false,
					error: "Invalid Authorization header format",
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
					`${mockServer}/user/user`,
					expect.objectContaining({
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify({
							cognitoId: "mocked-id",
						}),
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
