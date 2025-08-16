// mock

vi.mock("aws-amplify/auth", () => ({
	resendSignUpCode: vi.fn(),
}));

const mockedResendSignUpCode = vi.mocked(resendSignUpCode);
// imports

import { resendVerificationCode } from "./resendVerificationCode";
import { resendSignUpCode } from "aws-amplify/auth";
import { vi, expect, describe, afterEach, it } from "vitest";

// clean ups
afterEach(() => {
	vi.clearAllMocks();
});

//

describe("aws resendSignUpCode wrapper function ", () => {
	it("resendSignUpCode correctly resolves", async () => {
		mockedResendSignUpCode.mockResolvedValue({
			deliveryMedium: "EMAIL",
			destination: "test@example.com",
		});

		const { error, success, message, result } =
			await resendVerificationCode("test@example.com");

		//

		expect(error).toEqual("");
		expect(success).toEqual(true);
		expect(message).toEqual("Verification code emailed successfully");
	});

	// error scenarios

	it("should return User does not exist on UserNotFoundException", async () => {
		mockedResendSignUpCode.mockRejectedValue({ name: "UserNotFoundException" });

		const { error, success } = await resendVerificationCode("test@example.com");

		expect(error).toEqual("User does not exist");
		expect(success).toEqual(false);
	});
	it("should return Failed to deliver the code on CodeDeliveryFailureException", async () => {
		mockedResendSignUpCode.mockRejectedValue({
			name: "CodeDeliveryFailureException",
		});

		const { error, success } = await resendVerificationCode("test@example.com");

		expect(error).toEqual("Failed to deliver the code");
		expect(success).toEqual(false);
	});

	it("should return Unexpected error. Please try again on Undefined error", async () => {
		mockedResendSignUpCode.mockRejectedValue({});

		const { error, success } = await resendVerificationCode("test@example.com");
		expect(error).toEqual("Unexpected error. Please try again");
		expect(success).toEqual(false);
	});
});
