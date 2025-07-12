import { vi, describe, it, expect } from "vitest";

// setup mocks
vi.mock("aws-amplify/auth", () => ({
	signIn: vi.fn(),
	resendSignUpCode: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));
import { signIn, resendSignUpCode } from "aws-amplify/auth";
import { redirect } from "next/navigation";
const { handleLogin } = await vi.importActual<
	typeof import("@/libs/cognitoActions")
>("@/libs/cognitoActions");

describe("handleLogin", () => {
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

		expect(resendSignUpCode).toBeCalledWith({ username: "mandip@gmail.com" });
		expect(redirect).toBeCalledWith("/auth/confirmEmail");
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
