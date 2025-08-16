// mock

vi.mock("aws-amplify/auth", () => ({
	resetPassword: vi.fn(),
}));

const mockedResetPassword = vi.mocked(resetPassword);

// import

import { vi, describe, expect, it, afterEach } from "vitest";
import { resetPasswordUser } from "./resetPasswordUser";
import { resetPassword } from "aws-amplify/auth";
import { ResetPasswordOutput } from "aws-amplify/auth";
//

afterEach(() => {
	vi.clearAllMocks();
});

//
describe("wrapper function for aws resetPassword ", () => {
	it("should correctly resolve ", async () => {
		mockedResetPassword.mockResolvedValue({
			isPasswordReset: false,
			nextStep: {
				resetPasswordStep: "CONFIRM_RESET_PASSWORD_WITH_CODE",
				codeDeliveryDetails: {
					deliveryMedium: "EMAIL",
					destination: "test@example.com",
				},
			},
		});

		const { success, error, output, message } =
			await resetPasswordUser("test@example.com");

		expect(success).toEqual(true);
		expect(error).toEqual("");
		expect(message).toEqual("Code has been sent successfully");
	});

	// error scenarios

	it("should return Too many requests in a short time on LimitExceededException", async () => {
		mockedResetPassword.mockRejectedValue({ name: "LimitExceededException" });

		const { error, success } = await resetPasswordUser("test@example.com");
		expect(error).toEqual("Too many requests in a short time");
		expect(success).toEqual(false);
	});
	it("should return You are hitting Cognito rate limit on TooManyRequestsException", async () => {
		mockedResetPassword.mockRejectedValue({
			name: "TooManyRequestsException",
		});

		const { error, success } = await resetPasswordUser("test@example.com");
		expect(error).toEqual("You are hitting Cognito rate limit");
		expect(success).toEqual(false);
	});
	it("should return Unexpected error. Please try again on undefined error", async () => {
		mockedResetPassword.mockRejectedValue({});

		const { error, success } = await resetPasswordUser("test@example.com");
		expect(error).toEqual("Unexpected error. Please try again");
		expect(success).toEqual(false);
	});
});
