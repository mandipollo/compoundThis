//* aws cognito user enumaration policy prevents sending error for this function */
// mock setup

const mockedPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockedPush,
	}),
}));

vi.mock("@/libs/cognito/existingUser/resetPasswordUser", () => ({
	resetPasswordUser: vi.fn(),
}));

const mockedResetPasswordUser = vi.mocked(resetPasswordUser);

// actual module imports

// imports

import ResetPassword from "./ResetPassword";
import { resetPasswordUser } from "@/libs/cognito/existingUser/resetPasswordUser";
import { vi, expect, afterEach, describe, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

// user setup

const user = userEvent.setup();

// cleanups

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

//

describe("Password reset component", () => {
	//
	it("should render the initial component correctly ", async () => {
		render(<ResetPassword />);

		expect(screen.getByLabelText(/^email$/i));
		const submitBtn = screen.getByRole("button", { name: /^submit$/i });
		const loginBtn = screen.getByRole("button", { name: /^login$/i });

		expect(loginBtn).toBeEnabled();
		expect(submitBtn).toBeEnabled();
		expect(submitBtn).toHaveTextContent("Submit");
		expect(screen.getByTestId(/^loginLink$/i)).toHaveAttribute(
			"href",
			"/login"
		);
	});

	//
	it("should route user to confirm code page on submit", async () => {
		// mock resolve
		mockedResetPasswordUser.mockResolvedValue({
			success: true,
			message: "Code has been sent successfully",
			error: "",
			result: {
				nextStep: {
					resetPasswordStep: "CONFIRM_RESET_PASSWORD_WITH_CODE",
					codeDeliveryDetails: {
						deliveryMedium: "EMAIL",
						destination: "test@example.com",
					},
				},
				isPasswordReset: false,
			},
		});

		//
		render(<ResetPassword />);

		// user event

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.click(screen.getByRole("button", { name: /^submit$/i }));

		// assertion
		expect(mockedPush).toBeCalledWith("/newPassword");
	});
});
