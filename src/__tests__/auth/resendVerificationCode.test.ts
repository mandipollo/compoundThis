import { vi, describe, it, expect } from "vitest";

// mock setup

vi.mock("aws-amplify/auth", () => ({
	resendSignUpCode: vi.fn(),
}));

// imports

import { resendSignUpCode } from "aws-amplify/auth";
import {
	ConfirmSignupFormState,
	ResendVerificationCodeFormState,
} from "@/libs/definitions";

const mockedResendSignUpCode = vi.mocked(resendSignUpCode);
const { handleResendVerificationCode } = await vi.importActual<
	typeof import("@/libs/cognito/newUser/cognitoResendVerificationCode")
>("@/libs/cognito/newUser/cognitoResendVerificationCode");

describe("resends confirmation code ", () => {
	const initialState: ResendVerificationCodeFormState = {
		formValidationError: "",
		error: "",
		success: false,
		message: "",
	};
	it("returns formValidationError on input error", async () => {
		const formData = new FormData();

		formData.set("username", "");

		const result = await handleResendVerificationCode(initialState, formData);

		expect(result.formValidationError).toBeDefined();
	});

	it("returns User does not exist on UserNotFoundException", async () => {
		mockedResendSignUpCode.mockRejectedValue({
			name: "UserNotFoundException",
		});
		const formData = new FormData();
		formData.set("username", "mandipollo65@gmail.com");

		const result = await handleResendVerificationCode(initialState, formData);

		expect(result.error).toEqual("User does not exist");
	});
	it("returns Failed to deliver the code on CodeDeliveryFailureException", async () => {
		mockedResendSignUpCode.mockRejectedValue({
			name: "CodeDeliveryFailureException",
		});
		const formData = new FormData();
		formData.set("username", "mandipollo65@gmail.com");

		const result = await handleResendVerificationCode(initialState, formData);

		expect(result.error).toEqual("Failed to deliver the code");
	});

	// success scenario

	it("returns Successfully delivered on success", async () => {
		mockedResendSignUpCode.mockResolvedValue({
			deliveryMedium: "EMAIL",
		});
		const formData = new FormData();
		formData.set("username", "mandipollo65@gmail.com");

		const result = await handleResendVerificationCode(initialState, formData);

		expect(result.message).toEqual("Verification code emailed successfully");
		expect(result.success).toBe(true);
	});
});
