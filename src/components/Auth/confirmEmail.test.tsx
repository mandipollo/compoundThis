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
	// Test initial component
	it("should render the login form with all the inputs and button", async () => {
		// render the component
		render(<ConfirmEmail />);

		expect(screen.getByLabelText(/email/i));
		expect(screen.getByLabelText(/code/i));
		expect(screen.getByRole("button", { name: /submit/i }));
	});

	// error scenarios

	it("should correctly render User does not exist on error span element", async () => {
		// mock resolved value
		mockedConfirmUserEmail.mockResolvedValue({
			success: false,
			isSignUpComplete: false,
			message: "",
			error: "User does not exist",
		});

		// render

		render(<ConfirmEmail />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^verification code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"User does not exist"
		);
	});

	it("should correctly render Verification code is incorrect on error span element", async () => {
		// mock resolved value
		mockedConfirmUserEmail.mockResolvedValue({
			success: false,
			isSignUpComplete: false,
			message: "",
			error: "Verification code is incorrect",
		});

		// render

		render(<ConfirmEmail />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^verification code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Verification code is incorrect"
		);
	});

	it("should correctly render Verification code has expired on error span element", async () => {
		// mock resolved value
		mockedConfirmUserEmail.mockResolvedValue({
			success: false,
			isSignUpComplete: false,
			message: "",
			error: "Verification code has expired",
		});

		// render

		render(<ConfirmEmail />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^verification code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Verification code has expired"
		);
	});
	it("should correctly render Too many incorrect attempts on error span element", async () => {
		// mock resolved value
		mockedConfirmUserEmail.mockResolvedValue({
			success: false,
			isSignUpComplete: false,
			message: "",
			error: "Too many incorrect attempts",
		});

		// render

		render(<ConfirmEmail />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^verification code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Too many incorrect attempts"
		);
	});
	it("should correctly render Something went wrong. Please try agian on error span element", async () => {
		// mock resolved value
		mockedConfirmUserEmail.mockResolvedValue({
			success: false,
			isSignUpComplete: false,
			message: "",
			error: "Something went wrong. Please try agian",
		});

		// render

		render(<ConfirmEmail />);

		// user event

		const submitBtn = screen.getByRole("button", { name: /^submit$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^verification code$/i), "123456");
		await user.click(submitBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Something went wrong. Please try agian"
		);
	});
	//. Promise state scenario
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
			isSignUpComplete: true,
			message: "Signup complete",
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
