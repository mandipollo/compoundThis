// mock

vi.mock("aws-amplify/auth", () => ({
	confirmResetPassword: vi.fn(),
}));

const mockedConfirmResetPassword = vi.mocked(confirmResetPassword);

// imports

import { vi, expect, describe, it, beforeEach } from "vitest";
import { confirmResetPassword } from "aws-amplify/auth";
import { confirmResetPasswordHandler } from "./confirmResetPasswordHandler";

// test
describe("wrapper function for aws sign in ", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// error scenarios

	it("should return Code is invalid on CodeMismatchException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "CodeMismatchException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Code is invalid");
	});
	it("should return Expired code on ExpiredCodeException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "ExpiredCodeException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Expired code");
	});
	it("should return Invalid parameter on InvalidParameterException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "InvalidParameterException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Invalid parameter");
	});
	it("should return Invalid password on InvalidPasswordException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "InvalidPasswordException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Invalid password");
	});
	it("should return Limit exceeded on LimitExceededException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "LimitExceededException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Limit exceeded");
	});
	it("should return Password policy voilation on PasswordHistoryPolicyViolationException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "PasswordHistoryPolicyViolationException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Password policy voilation");
	});
	it("should return User not confirmed on UserNotConfirmedException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "UserNotConfirmedException",
		});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("User not confirmed");
	});
	it("should return Unexpected error. Please try again on Uncaught error", async () => {
		mockedConfirmResetPassword.mockRejectedValue({});

		const { success, error } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Unexpected error. Please try again");
	});

	// success scenario
	it("resolves correctly ", async () => {
		mockedConfirmResetPassword.mockResolvedValue();

		const { error, success } = await confirmResetPasswordHandler(
			"test@example.com",
			"Password123@",
			"123456"
		);

		expect(mockedConfirmResetPassword).toHaveBeenCalledWith({
			username: "test@example.com",
			newPassword: "Password123@",
			confirmationCode: "123456",
		});
		expect(error).toEqual("");
		expect(success).toEqual(true);
	});
});
