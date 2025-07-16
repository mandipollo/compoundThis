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
const { handleConfirmSignUp } = await vi.importActual<
	typeof import("@/libs/cognitoActions")
>("@/libs/cognitoActions");

describe("confirmSignupHandler", () => {
	const initialState: ConfirmSignupFormState = {
		errors: { email: "", code: "" },
		message: "",
		success: false,
	};
	it("invalid input returns error ", async () => {
		const formData = new FormData();

		formData.set("email", "");
		formData.set("code", "");

		const result = await handleConfirmSignUp(initialState, formData);

		expect(result?.errors?.email).toBeDefined();
		expect(result?.errors?.code).toBeDefined();
		expect(result?.success).toBe(false);
	});

	// exceptions

	it("returns User does not exist on UserNotFoundException", async () => {
		(confirmSignUp as any).mockRejectedValue({
			name: "UserNotFoundException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.message).toEqual("User does not exist");
	});

	it("returns Verification code is incorrect on CodeMismatchException", async () => {
		(confirmSignUp as any).mockRejectedValue({
			name: "CodeMismatchException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.message).toEqual("Verification code is incorrect");
	});
	it("returns Verification code has expired on ExpiredCodeException", async () => {
		(confirmSignUp as any).mockRejectedValue({
			name: "ExpiredCodeException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.message).toEqual("Verification code has expired");
	});
	it("returns Too many incorrect attempts on TooManyFailedAttemptsException", async () => {
		(confirmSignUp as any).mockRejectedValue({
			name: "TooManyFailedAttemptsException",
		});
		const formData = new FormData();
		formData.set("email", "mandi@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(false);
		expect(result.message).toEqual("Too many incorrect attempts");
	});

	// success scenario

	it("redirects user to dashboard on successfull signup", async () => {
		(confirmSignUp as any).mockResolvedValue({
			isSignUpComplete: true,
		});

		const formData = new FormData();

		formData.set("email", "mandipolo@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(true);
		expect(redirect).toBeCalledWith("/user");
	});

	it("auto login user on successfull signup", async () => {
		(confirmSignUp as any).mockResolvedValue({
			isSignUpComplete: true,
		});

		const formData = new FormData();

		formData.set("email", "mandipolo@gmail.com");
		formData.set("code", "12345678");
		const result = await handleConfirmSignUp(initialState, formData);

		expect(result.success).toBe(true);
	});
});
