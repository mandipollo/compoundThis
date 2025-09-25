//

vi.stubGlobal("fetch", vi.fn());
const mockedFetch = vi.mocked(fetch);

// mock useRouter

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));
const mockPush = vi.fn();

// mock cognito function

vi.mock("@/libs/cognito/existingUser/confirmResetPasswordHandler", () => ({
	confirmResetPasswordHandler: vi.fn(),
}));
const mockedConfirmResetPassword = vi.mocked(confirmResetPasswordHandler);

// imports
import React from "react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup, act } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { confirmResetPasswordHandler } from "@/libs/cognito/existingUser/confirmResetPasswordHandler";
import NewPassword from "./NewPassword";

// user setup
const user = userEvent.setup();
//

describe("New password component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		cleanup();
	});
	// Test initial component render
	it("should render the Reset Password form with all the inputs and button ", async () => {
		render(<NewPassword />);

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });
		const resendBtn = screen.getByRole("button", {
			name: /^resend code$/i,
		});

		// assertions
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Confirmation code/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();

		expect(submitBtn).toBeInTheDocument();
		expect(resendBtn).toBeInTheDocument();
	});

	it("should correctly render Error on error span element", async () => {
		// mock resolved value
		mockedConfirmResetPassword.mockResolvedValue({
			success: false,
			error: "Code is invalid",
		});

		// render

		render(<NewPassword />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^New Password$/i), "Password123");
		await user.type(screen.getByLabelText(/^Confirmation Code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		const errorSpan = screen.findByTestId("error");
		await expect(errorSpan).resolves.toHaveTextContent("Code is invalid");
	});

	// success scenarios
	it("should show loading state and disable the button during submission than navigate user to /auth/login", async () => {
		//  mock unresolved promise for pending state

		let ConfirmResetPasswordPromiseResolver: (
			value: Awaited<ReturnType<typeof mockedConfirmResetPassword>>
		) => void;
		const loginPromise = new Promise<
			Awaited<ReturnType<typeof mockedConfirmResetPassword>>
		>(resolve => {
			ConfirmResetPasswordPromiseResolver = resolve;
		});
		mockedConfirmResetPassword.mockReturnValue(loginPromise);

		render(<NewPassword />);

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		// assert inital state

		expect(submitBtn).toBeEnabled();
		expect(submitBtn).toHaveTextContent("Submit");

		// User events

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/New Password/i), "Password123@");
		await user.type(screen.getByLabelText(/Confirmation Code/i), "123456");
		await user.click(submitBtn);

		// assert loading state

		expect(submitBtn).toHaveAttribute("aria-disabled", "true");

		// resolve the promise

		await act(async () => {
			ConfirmResetPasswordPromiseResolver({
				success: true,
				error: "",
			});
		});

		// assert user has been routed to user page

		expect(mockPush).toBeCalledWith("/login");
	});
});
