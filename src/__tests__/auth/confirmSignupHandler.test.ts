import { vi, describe, it, expect } from "vitest";
import { ConfirmSignupFormState } from "@/libs/definitions";
// mock setup
vi.mock("aws-amplify/auth", () => ({
	confirmSignUp: vi.fn(),
}));
vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

// imports
import { confirmSignUp } from "aws-amplify/auth";
import { redirect } from "next/navigation";

const mockedConfirmSignup = vi.mocked(confirmSignUp);
const { handleConfirmSignUp } = await vi.importActual<
	typeof import("@/libs/cognito/newUser/cognitoConfirmSignup")
>("@/libs/cognito/newUser/cognitoConfirmSignup");

describe("confirmSignupHandler", () => {
	const initialState: ConfirmSignupFormState = {
		formValidationErrors: { email: "", code: "" },
		error: "",
		message: "",
		success: false,
	};
	it("invalid input returns error ", async () => {
		const formData = new FormData();

		formData.set("email", "");
		formData.set("code", "");

		const result = await handleConfirmSignUp(initialState, formData);

		expect(result?.formValidationErrors?.email).toBeDefined();
		expect(result?.formValidationErrors?.code).toBeDefined();
		expect(result?.success).toBe(false);
	});

	// exceptions

	it("returns User does not exist on UserNotFoundException", async () => {
		mockedConfirmSignup.mockRejectedValue({
			name: "UserNotFoundException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "123456");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.error).toEqual("User does not exist");
	});

	it("returns Verification code is incorrect on CodeMismatchException", async () => {
		mockedConfirmSignup.mockRejectedValue({
			name: "CodeMismatchException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "123456");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.error).toEqual("Verification code is incorrect");
	});
	it("returns Verification code has expired on ExpiredCodeException", async () => {
		mockedConfirmSignup.mockRejectedValue({
			name: "ExpiredCodeException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "123456");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.error).toEqual("Verification code has expired");
	});
	it("returns Too many incorrect attempts on TooManyFailedAttemptsException", async () => {
		(confirmSignUp as any).mockRejectedValue({
			name: "TooManyFailedAttemptsException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "123456");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.error).toEqual("Too many incorrect attempts");
	});

	// success scenario

	it("redirects user to login after successfull verification", async () => {
		mockedConfirmSignup.mockResolvedValue({
			isSignUpComplete: true,
			nextStep: { signUpStep: "DONE" },
		});

		const formData = new FormData();

		formData.set("email", "mandipolo@gmail.com");
		formData.set("code", "123456");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(redirect).toHaveBeenCalledWith("/auth/login");
		expect(result).toEqual({
			success: true,
			formValidationErrors: { email: "", code: "" },
			error: "",
			message: "Verification complete",
		});
	});
});
