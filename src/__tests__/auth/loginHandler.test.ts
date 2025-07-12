import { vi, describe, it, expect } from "vitest";

let resendMock: ReturnType<typeof vi.fn>;
let redirectMock: ReturnType<typeof vi.fn>;

import { beforeEach } from "node:test";
describe("handleLogin", () => {
	beforeEach(() => {
		vi.resetAllMocks();

		// setup mocks

		vi.mock("aws-amplify/auth", () => ({
			signIn: vi.fn(),
		}));

		vi.mock("@/libs/cognitoActions", async () => {
			const actual = await vi.importActual<
				typeof import("@/libs/cognitoActions")
			>("@/libs/cognitoActions");
			const localResendMock = vi.fn();
			resendMock = localResendMock;
			return {
				...actual,
				resendSignUpCode: localResendMock,
			};
		});

		vi.mock("next/navigation", async () => {
			const actual = await vi.importActual<typeof import("next/navigation")>(
				"next/navigation"
			);

			const localRedirectMock = vi.fn();
			redirectMock = localRedirectMock;
			return {
				...actual,
				redirect: localRedirectMock,
			};
		});
	});

	const { handleLogin } = await vi.importActual<
		typeof import("@/libs/cognitoActions")
	>("@/libs/cognitoActions");
	const { signIn } = await vi.importActual<typeof import("aws-amplify/auth")>(
		"aws-amplify/auth"
	);
	it("returns error on invalid input", async () => {
		const formData = new FormData();
		formData.set("email", "");
		formData.set("password", "");

		const result = await handleLogin(undefined, formData);
		expect(result?.errors?.email).toBeDefined();
		expect(result?.errors?.password).toBeDefined();
		expect(result?.success).toBe(false);
	});

	// login exceptions
	it("returns User does not exists on UserNotFoundException ", async () => {
		(signIn as any).mockRejectedValue({
			name: "UserNotFoundException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "mandip123@");

		const result = await handleLogin(undefined, formData);

		expect(result?.message).toEqual("User does not exist.");
	});

	it("returns Incorrect email or password on NotAuthorizedException", async () => {
		(signIn as any).mockRejectedValue({
			name: "NotAuthorizedException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "mandip123@");

		const result = await handleLogin(undefined, formData);

		expect(result?.message).toEqual("Incorrect email or password.");
	});

	it("returns User not confirmed on UserNotConfirmedException", async () => {
		(signIn as any).mockRejectedValue({
			name: "UserNotConfirmedException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "mandip123@");

		const result = await handleLogin(undefined, formData);

		expect(result?.message).toEqual("User not confirmed.");
	});

	//
	it("resends code and directs the user to confirm email page", async () => {
		(signIn as any).mockResolvedValue({
			nextStep: { signInStep: "CONFIRM_SIGN_UP" },
			isSignedIn: false,
		});

		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "mandip123@");

		const result = await handleLogin(undefined, formData);

		expect(resendMock).toBeCalledWith({ email: "mandip@gmail.com" });
	});

	//
	it("returns success on successfully signing in ", async () => {
		// simulate successful login
		(signIn as any).mockResolvedValue({
			isSignedIn: true,
			nextStep: undefined,
		});

		const formData = new FormData();

		formData.set("email", "mandipgurung65@yahoo.com");
		formData.set("password", "password123@");

		const result = await handleLogin(undefined, formData);

		expect(result).toEqual({ success: true });
	});
});
