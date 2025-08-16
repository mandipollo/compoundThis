// mock setup

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));
// mock cognito function

vi.mock("@/libs/cognito/newUser/confirmEmailUser", () => ({
	confirmUserEmail: vi.fn(),
}));
const mockedConfirmUserEmail = vi.mocked(confirmUserEmail);
// imports

import { vi, it, describe, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmEmail from "@/components/Auth/ConfirmEmail";
import { confirmUserEmail } from "@/libs/cognito/newUser/confirmEmailUser";
import { useRouter } from "next/navigation";

// user setup

const user = userEvent.setup();
// clean ups

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

//

describe("confirm email component", () => {
	//
	it("should render the login form with all the inputs and button", async () => {
		// render the component
		render(<ConfirmEmail />);

		expect(screen.getByLabelText(/email/i));
		expect(screen.getByLabelText(/code/i));
		expect(screen.getByRole("button", { name: /submit/i }));
	});

	//
	it("should show loading state and disable the button during submission", async () => {
		// mock promise

		let confirmEmailResolver: (
			value: Awaited<ReturnType<typeof mockedConfirmUserEmail>>
		) => void;

		const confirmEmailPromsie = new Promise<
			Awaited<ReturnType<typeof mockedConfirmUserEmail>>
		>(resolve => {
			confirmEmailResolver = resolve;
		});

		// call mock email confirm with promise

		mockedConfirmUserEmail.mockReturnValue(confirmEmailPromsie);

		// render component

		render(<ConfirmEmail />);

		// assertion initial
		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		expect(submitBtn).toBeDefined();
		expect(submitBtn).toHaveTextContent("Submit");

		// user events

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/code/i), "123456");
		await user.click(submitBtn);

		// assert loading state
		expect(submitBtn).toHaveAttribute("aria-disabled", "true");
	});

	//

	it("on successful code verificaton user is routed to login page", async () => {
		// mock resolve

		mockedConfirmUserEmail.mockResolvedValue({
			success: true,
			error: "",
			result: {
				isSignUpComplete: true,
				nextStep: {
					signUpStep: "DONE",
				},
			},
		});

		// render

		render(<ConfirmEmail />);

		// user events

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/code/i), "123456");
		await user.click(screen.getByRole("button", { name: /^submit$/i }));

		// assertion

		await waitFor(() => {
			expect(mockPush).toBeCalledWith("/auth/login");
		});
	});
});
