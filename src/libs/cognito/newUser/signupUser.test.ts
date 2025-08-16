// mock

vi.mock("aws-amplify/auth", () => ({
	signUp: vi.fn(),
}));

const mockedSignUp = vi.mocked(signUp);
// imports

import { describe, vi, it, expect, afterEach } from "vitest";

import { signUpUser } from "./signupUser";
import { signUp } from "aws-amplify/auth";

// clean up

afterEach(() => {
	vi.clearAllMocks();
});

//
describe("aws signup wrapper function ", () => {
	it("should resolve correctly", async () => {
		mockedSignUp.mockResolvedValue({
			nextStep: {
				signUpStep: "CONFIRM_SIGN_UP",
				codeDeliveryDetails: {
					deliveryMedium: "EMAIL",
					destination: "test@example.com",
				},
			},
			isSignUpComplete: false,
		});

		const { error, success, result } = await signUpUser(
			"test@example.com",
			"test",
			"Password123@"
		);

		expect(error).toEqual("");
		expect(success).toEqual(true);
		expect(result).toEqual({
			nextStep: {
				signUpStep: "CONFIRM_SIGN_UP",
				codeDeliveryDetails: {
					deliveryMedium: "EMAIL",
					destination: "test@example.com",
				},
			},
			isSignUpComplete: false,
		});
	});

	// error scenario

	it("should return Username is already taken on UsernameExistsException", async () => {
		mockedSignUp.mockRejectedValue({
			name: "UsernameExistsException",
		});

		const { error, success } = await signUpUser(
			"test@example.com",
			"test",
			"Password123@"
		);

		expect(error).toEqual("Username is already taken");
		expect(success).toEqual(false);
	});
	it("should return Too many attempts. Please try again later on LimitExceededException", async () => {
		mockedSignUp.mockRejectedValue({
			name: "LimitExceededException",
		});

		const { error, success } = await signUpUser(
			"test@example.com",
			"test",
			"Password123@"
		);

		expect(error).toEqual("Too many attempts. Please try again later");
		expect(success).toEqual(false);
	});
	it("should return Password does not meet requirements on InvalidPasswordException", async () => {
		mockedSignUp.mockRejectedValue({
			name: "InvalidPasswordException",
		});

		const { error, success } = await signUpUser(
			"test@example.com",
			"test",
			"Password123@"
		);

		expect(error).toEqual("Password does not meet requirements");
		expect(success).toEqual(false);
	});
	it("should return Unexpected error. Please try again on undefined error", async () => {
		mockedSignUp.mockRejectedValue({});

		const { error, success } = await signUpUser(
			"test@example.com",
			"test",
			"Password123@"
		);

		expect(error).toEqual("Unexpected error. Please try again");
		expect(success).toEqual(false);
	});
});
