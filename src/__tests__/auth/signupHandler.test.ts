import { vi, describe, it, expect } from "vitest";

////////////////// mock setups

vi.mock("aws-amplify/auth", () => ({
	signUp: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

////////////////// imports
import { redirect } from "next/navigation";
import { signUp } from "aws-amplify/auth";
import { FormState } from "@/libs/definitions";

////////////////// actual module imports

const mockedSignUp = vi.mocked(signUp);
const { handleSignUp } = await vi.importActual<
	typeof import("@/libs/cognito/newUser/cognitoSignup")
>("@/libs/newUser/cognitoSignup");

describe("signupHandler", () => {
	//
	const initialState: FormState = {
		errors: { name: [], email: [], password: [] },
		message: undefined,
		success: false,
	};
	it("invalid inputs returns errors", async () => {
		const formData = new FormData();
		formData.set("name", "");
		formData.set("email", "");
		formData.set("password", "");

		const result = await handleSignUp(initialState, formData);

		expect(result?.errors?.name).toBeDefined();
		expect(result?.errors?.email).toBeDefined();
		expect(result?.errors?.password).toBeDefined();
		expect(result?.success).toBe(false);
	});

	// signup exceptions
	it("returns Username is already taken on UsernameExistsException ", async () => {
		mockedSignUp.mockRejectedValue({
			name: "UsernameExistsException",
		});
		const formData = new FormData();
		formData.set("name", "mandip");
		formData.set("email", "mandip123@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleSignUp(initialState, formData);

		expect(result?.message).toEqual("Username is already taken");
	});
	it("returns Too many attempts. Please try again later on LimitExceedException ", async () => {
		mockedSignUp.mockRejectedValue({
			name: "LimitExceededException",
		});
		const formData = new FormData();
		formData.set("name", "mandip");
		formData.set("email", "mandip123@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleSignUp(initialState, formData);

		expect(result?.message).toEqual(
			"Too many attempts. Please try again later"
		);
	});
	it("returns Password does not meet requirements on InvalidPasswordException ", async () => {
		mockedSignUp.mockRejectedValue({
			name: "InvalidPasswordException",
		});
		const formData = new FormData();
		formData.set("name", "mandip");
		formData.set("email", "mandip123@gmail.com");
		formData.set("password", "Mandip123@");

		const result = await handleSignUp(initialState, formData);

		expect(result?.message).toEqual("Password does not meet requirements");
	});

	// check redirects
	it("redirects user to confirm email page  ", async () => {
		mockedSignUp.mockResolvedValue({
			nextStep: { signUpStep: "CONFIRM_SIGN_UP", codeDeliveryDetails: {} },
			isSignUpComplete: true,
		});
		const formData = new FormData();
		formData.set("name", "mandip");
		formData.set("email", "mandip123@gmail.com");
		formData.set("password", "Mandip123@");

		await handleSignUp(initialState, formData);

		expect(redirect).toBeCalledWith("/auth/confirmEmail");
	});

	it("redirects user to dashboard if signup complete  ", async () => {
		mockedSignUp.mockResolvedValue({
			isSignUpComplete: true,
			nextStep: { signUpStep: "DONE" },
		});
		const formData = new FormData();
		formData.set("name", "mandip");
		formData.set("email", "mandip123@gmail.com");
		formData.set("password", "Mandip123@");

		await handleSignUp(initialState, formData);

		expect(redirect).toBeCalledWith("/user");
	});

	// it("next redirects should be rethrown from catch to allow nextjs to handle the navigation ", async () => {
	// 	mockedSignUp.mockResolvedValue({
	// 		nextSteps: { signUpStep: "CONFIRM_SIGN_UP" },
	// 	});

	// 	const formData = new FormData();

	// 	formData.set("name", "mandip");
	// 	formData.set("email", "mandipollo65@gamil.com");
	// 	formData.set("password", "Mandip123@");

	// 	const result = await handleSignUp(initialState, formData);

	// 	expect
	// });
});
