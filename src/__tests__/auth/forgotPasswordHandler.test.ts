import { vi, describe, it, expect } from "vitest";

// mock setup

vi.mock("aws-amplify/auth", () => ({
	resetPassword: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));
// imports
import { resetPassword } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { ForgotPasswordFormState } from "@/libs/definitions";

const mockedResetPassword = vi.mocked(resetPassword);
const { handleForgotPassword } = await vi.importActual<
	typeof import("@/libs/cognito/existingUser/cognitoForgotPassword")
>("@/libs/cognito/existingUser/cognitoForgotPassword");

describe("forgotPasswordHandler", () => {
	const initialState: ForgotPasswordFormState = {
		formValidationError: "",
		error: "",
		success: false,
		message: "",
	};

	it("returns errors on invalid input", async () => {
		const formData = new FormData();
		formData.set("username", "");

		const result = await handleForgotPassword(initialState, formData);

		expect(result?.success).toBe(false);
		expect(result.formValidationError).toBeDefined();
	});
	it("returns User does not exist on UserNotFoundException", async () => {
		mockedResetPassword.mockRejectedValue({
			name: "UserNotFoundException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("User does not exist");
	});
	it("returns Too many requests in a short time on LimitExceededException", async () => {
		mockedResetPassword.mockRejectedValue({
			name: "LimitExceededException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("Too many requests in a short time");
	});
	it("returns You are hitting Cognito rate limit on TooManyRequestsException", async () => {
		mockedResetPassword.mockRejectedValue({
			name: "TooManyRequestsException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("You are hitting Cognito rate limit");
	});
	it("redirects user to verification code submission page on username submission", async () => {
		mockedResetPassword.mockResolvedValue({
			nextStep: {
				resetPasswordStep: "CONFIRM_RESET_PASSWORD_WITH_CODE",
				codeDeliveryDetails: {},
			},
			isPasswordReset: true,
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");
		await handleForgotPassword(initialState, formData);
		expect(redirect).toHaveBeenCalledWith("/auth/newPassword");
	});
});
