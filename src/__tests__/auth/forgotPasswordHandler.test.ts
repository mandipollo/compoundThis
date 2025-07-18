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

const { handleForgotPassword } = await vi.importActual<
	typeof import("@/libs/cognitoActions")
>("@/libs/cognitoActions");

describe("forgotPasswordHandler", () => {
	const initialState: ForgotPasswordFormState = {
		error: "",
		success: false,
		message: "",
	};

	it("returns errors on invalid input", async () => {
		const formData = new FormData();
		formData.set("username", "");

		const result = await handleForgotPassword(initialState, formData);

		expect(result?.success).toBe(false);
		expect(result.error).toEqual("Invalid username");
	});
	it("returns User does not exist on UserNotFoundException", async () => {
		(resetPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
			name: "UserNotFoundException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("User does not exist");
	});
	it("returns Too many requests in a short time on LimitExceededException", async () => {
		(resetPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
			name: "LimitExceededException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("Too many requests in a short time");
	});
	it("returns You are hitting Cognito rate limit on TooManyRequestsException", async () => {
		(resetPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
			name: "TooManyRequestsException",
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");

		const result = await handleForgotPassword(initialState, formData);

		expect(result.error).toEqual("You are hitting Cognito rate limit");
	});
	it("redirects user to verification code submission page on username submission", async () => {
		(resetPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
			nextStep: { resetPasswordStep: "CONFIRM_RESET_PASSWORD_WITH_CODE" },
		});

		const formData = new FormData();
		formData.set("username", "mandipollo65@gmai.com");
		await handleForgotPassword(initialState, formData);
		expect(redirect).toHaveBeenCalledWith("/auth/newPassword");
	});
});
