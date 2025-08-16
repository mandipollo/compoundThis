// // mock

vi.mock("aws-amplify/auth", () => ({
	confirmSignUp: vi.fn(),
}));

const mockedConfirmSignUp = vi.mocked(confirmSignUp);

// import

import { vi, describe, expect, it, afterEach } from "vitest";
import { confirmUserEmail } from "./confirmEmailUser";
import { confirmSignUp } from "aws-amplify/auth";

//

afterEach(() => {
	vi.clearAllMocks();
});

//
describe("wrapper function for aws resetPassword ", () => {
	it("should resolve correctly", async () => {
		mockedConfirmSignUp.mockResolvedValue({
			isSignUpComplete: true,
			nextStep: { signUpStep: "DONE" },
		});

		const { error, success, message, isSignUpComplete } =
			await confirmUserEmail("test@example.com", "Password123@");

		expect(error).toEqual("");
		expect(success).toEqual(true);
		expect(message).toEqual("Signup complete");
		expect(isSignUpComplete).toEqual(true);
	});
	// error scenarios

	it("should return User does not exist on UserNotFoundException", async () => {
		mockedConfirmSignUp.mockRejectedValue({ name: "UserNotFoundException" });

		const { error, success } = await confirmUserEmail(
			"test@example.com",
			"Password123@"
		);
		expect(error).toEqual("User does not exist");
		expect(success).toEqual(false);
	});
	it("should return Verification code is incorrect on CodeMismatchException", async () => {
		mockedConfirmSignUp.mockRejectedValue({
			name: "CodeMismatchException",
		});

		const { error, success } = await confirmUserEmail(
			"test@example.com",
			"Password123@"
		);
		expect(error).toEqual("Verification code is incorrect");
		expect(success).toEqual(false);
	});
	it("should return Verification code has expired on ExpiredCodeException", async () => {
		mockedConfirmSignUp.mockRejectedValue({
			name: "ExpiredCodeException",
		});

		const { error, success } = await confirmUserEmail(
			"test@example.com",
			"Password123@"
		);
		expect(error).toEqual("Verification code has expired");
		expect(success).toEqual(false);
	});
	it("should return Too many incorrect attempts on TooManyFailedAttemptsException", async () => {
		mockedConfirmSignUp.mockRejectedValue({
			name: "TooManyFailedAttemptsException",
		});

		const { error, success } = await confirmUserEmail(
			"test@example.com",
			"Password123@"
		);
		expect(error).toEqual("Too many incorrect attempts");
		expect(success).toEqual(false);
	});
	it("should return Unexpected error. Please try again on undefined error", async () => {
		mockedConfirmSignUp.mockRejectedValue({});

		const { error, success } = await confirmUserEmail(
			"test@example.com",
			"Password123@"
		);
		expect(error).toEqual("Unexpected error. Please try again");
		expect(success).toEqual(false);
	});
});
