import { vi, describe, it, expect } from "vitest";

// mock setup
vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

vi.mock("aws-amplify/auth", () => ({
	confirmResetPassword: vi.fn(),
}));

// imports
import { confirmResetPassword } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { confirmPasswordResetFormState } from "@/libs/definitions";

const mockedConfirmResetPassword = vi.mocked(confirmResetPassword);
// actual imports

const { handleConfirmResetPassword } = await vi.importActual<
	typeof import("@/libs/cognito/existingUser/cognitoConfirmResetPassword")
>("@/libs/cognito/existingUser/cognitoConfirmResetPassword");

const initalState: confirmPasswordResetFormState = {
	formValidationErrors: { username: [], newPassword: [], confirmationCode: [] },
	success: false,
	error: "",
	message: "",
};

describe("confirmPasswordResetHandler", () => {
	it("returns error on invalid inputs ", async () => {
		const formData = new FormData();

		formData.set("username", "");
		formData.set("newPassword", "");
		formData.set("confirmationCode", "");

		const result = await handleConfirmResetPassword(initalState, formData);

		expect(result.success).toBe(false);
		expect(result.error).toBeDefined();
	});

	it("returns code is invalid on CodeMismatchException", async () => {
		mockedConfirmResetPassword.mockRejectedValue({
			name: "CodeMismatchException",
		});
		const formData = new FormData();
		formData.set("username", "mandipollo65@gmail.com");
		formData.set("confirmationCode", "234234");
		formData.set("newPassword", "Mandip123@");

		const result = await handleConfirmResetPassword(initalState, formData);

		expect(result.error).toEqual("Code is invalid");
		expect(result.success).toEqual(false);
	});
});
