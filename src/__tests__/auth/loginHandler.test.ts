import { vi, describe, it, expect } from "vitest";

//////////////////// setup mocks

vi.mock("aws-amplify/auth", () => ({
	signIn: vi.fn(),
	resendSignUpCode: vi.fn(),
	// fetchAuthSession: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

////////////////// imports
import { signIn, resendSignUpCode } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { LoginFormState } from "@/libs/definitions";

const mockedSignIn = vi.mocked(signIn);
const mockResendSignUpCode = vi.mocked(resendSignUpCode);

const { handleLogin } = await vi.importActual<
	typeof import("@/libs/cognito/existingUser/cognitoLogin")
>("@/libs/cognito/existingUser/cognitoLogin");

describe("LoginHandler", () => {
	const initialState: LoginFormState = {
		formValidationErrors: { email: [], password: [] },
		error: "",
		message: "",
		success: false,
	};
	it("returns error on invalid input", async () => {
		const formData = new FormData();
		formData.set("email", "");
		formData.set("password", "");

		const result = await handleLogin(initialState, formData);
		expect(result?.formValidationErrors?.email).toBeDefined();
		expect(result?.formValidationErrors?.password).toBeDefined();
		expect(result?.success).toBe(false);
	});

	// login exceptions
	it("returns User does not exists on UserNotFoundException ", async () => {
		mockedSignIn.mockRejectedValue({
			name: "UserNotFoundException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleLogin(initialState, formData);

		expect(result?.error).toEqual("User does not exist.");
	});

	it("returns Incorrect email or password on NotAuthorizedException", async () => {
		mockedSignIn.mockRejectedValue({
			name: "NotAuthorizedException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleLogin(initialState, formData);

		expect(result?.error).toEqual("Incorrect email or password.");
	});

	it("returns User not confirmed on UserNotConfirmedException", async () => {
		mockedSignIn.mockRejectedValue({
			name: "UserNotConfirmedException",
		});
		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleLogin(initialState, formData);

		expect(result?.error).toEqual("User not confirmed.");
	});

	//
	it("resends code and directs the user to confirm email page", async () => {
		mockedSignIn.mockResolvedValue({
			nextStep: { signInStep: "CONFIRM_SIGN_UP" },
			isSignedIn: false,
		});

		const formData = new FormData();
		formData.set("email", "mandip@gmail.com");
		formData.set("password", "Mandip123@");

		await handleLogin(initialState, formData);

		expect(mockResendSignUpCode).toBeCalledWith({
			username: "mandip@gmail.com",
		});
		expect(redirect).toHaveBeenCalledWith("/auth/confirmEmail");
	});

	//
	it("returns success on successfully signing in ", async () => {
		// simulate successful login
		mockedSignIn.mockResolvedValue({
			isSignedIn: true,
			nextStep: { signInStep: "DONE" },
		});

		const formData = new FormData();

		formData.set("email", "mandipgurung65@yahoo.com");
		formData.set("password", "Password123@");

		const result = await handleLogin(initialState, formData);

		expect(result).toEqual({
			formValidationErrors: { email: [], password: [] },
			success: true,
			message: "Successfully logged in",
			error: "",
		});
	});
});
