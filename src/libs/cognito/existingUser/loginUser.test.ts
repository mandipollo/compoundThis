// mock

vi.mock("aws-amplify/auth", () => ({
	signIn: vi.fn(),
}));

const mockedSignin = vi.mocked(signIn);

// imports

import { vi, expect, describe, it, beforeEach } from "vitest";
import { signIn } from "aws-amplify/auth";
import { loginUser } from "./loginUser";

// test
describe("wrapper function for aws sign in ", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// error scenarios

	it("should return User does not exist. on UserNotFoundException", async () => {
		mockedSignin.mockRejectedValue({ name: "UserNotFoundException" });

		const { success, error } = await loginUser(
			"test@example.com",
			"Password123@"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("User does not exist.");
	});
	it("should return Incorrect email or password. on NotAuthorizedException", async () => {
		mockedSignin.mockRejectedValue({ name: "NotAuthorizedException" });

		const { success, error } = await loginUser(
			"test@example.com",
			"Password123@"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Incorrect email or password.");
	});
	it("should return User not confirmed. on UserNotConfirmedException", async () => {
		mockedSignin.mockRejectedValue({ name: "UserNotConfirmedException" });

		const { success, error } = await loginUser(
			"test@example.com",
			"Password123@"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("User not confirmed.");
	});
	it("should return Unexpected error. Please try again on Uncaught error", async () => {
		mockedSignin.mockRejectedValue({});

		const { success, error } = await loginUser(
			"test@example.com",
			"Password123@"
		);

		expect(success).toEqual(false);
		expect(error).toEqual("Unexpected error. Please try again");
	});

	it("resolves correctly ", async () => {
		mockedSignin.mockResolvedValue({
			isSignedIn: true,
			nextStep: { signInStep: "DONE" },
		});

		const { result, error, success } = await loginUser(
			"test@example.com",
			"Password123@"
		);

		expect(mockedSignin).toHaveBeenCalledWith({
			username: "test@example.com",
			password: "Password123@",
		});
		expect(error).toEqual("");
		expect(success).toEqual(true);
		expect(result).toEqual({
			isSignedIn: true,
			nextStep: { signInStep: "DONE" },
		});
	});
});
