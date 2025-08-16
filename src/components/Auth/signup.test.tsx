// mock setup

const mockedPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockedPush,
	}),
}));

const mockedSignupUser = vi.mocked(signUpUser);
vi.mock("@/libs/cognito/newUser/signupUser", () => ({
	signUpUser: vi.fn(),
}));

// imports
import { signUpUser } from "@/libs/cognito/newUser/signupUser";
import { vi, expect, describe, afterEach, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";
import { useRouter } from "next/navigation";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

// user setup

const user = userEvent.setup();

// cleanups

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

//

describe("signup component", () => {
	// initial component

	it("should render the component and elements correctly", async () => {
		render(<Signup />);

		//assertions

		expect(screen.getByLabelText(/^name$/i)).toBeDefined();
		expect(screen.getByLabelText(/^email$/i)).toBeDefined();
		expect(screen.getByLabelText(/^password$/i)).toBeDefined();

		const signupBtn = screen.getByRole("button", { name: "Signup" });
		expect(signupBtn).toBeEnabled();
		expect(signupBtn).toHaveTextContent("Signup");
	});

	// loading state

	it("should render loading state and disable signup button", async () => {
		// mock promise

		let signupresolver: (
			value: Awaited<ReturnType<typeof mockedSignupUser>>
		) => void;

		const signupPromise = new Promise<
			Awaited<ReturnType<typeof mockedSignupUser>>
		>(resolve => (signupresolver = resolve));

		mockedSignupUser.mockReturnValue(signupPromise);

		//
		render(<Signup />);

		const signupBtn = screen.getByRole("button", { name: "Signup" });
		// user event

		await user.type(screen.getByLabelText(/^name$/i), "test");
		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(signupBtn);

		// assertion

		await waitFor(async () => {
			expect(signupBtn).toHaveAttribute("aria-disabled", "true");
		});
	});

	// error scenarios

	it("should render Username is already taken on span element error ", async () => {
		mockedSignupUser.mockResolvedValue({
			success: false,
			error: "Username is already taken",
			result: null,
		});

		//

		render(<Signup />);
		const signupBtn = screen.getByRole("button", { name: "Signup" });

		// user event

		await user.type(screen.getByLabelText(/^name$/i), "test");
		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(signupBtn);

		// assertion

		expect(screen.getByTestId("error")).toHaveTextContent(
			"Username is already taken"
		);
	});

	it("should render Too many attempts. Please try again later on error span element", async () => {
		mockedSignupUser.mockResolvedValue({
			success: false,
			error: "Too many attempts. Please try again later",
			result: null,
		});

		//

		render(<Signup />);
		const signupBtn = screen.getByRole("button", { name: "Signup" });

		// user event

		await user.type(screen.getByLabelText(/^name$/i), "test");
		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(signupBtn);

		// assertion

		expect(screen.getByTestId("error")).toHaveTextContent(
			"Too many attempts. Please try again later"
		);
	});
	it("should render Password does not meet requirements on error span element", async () => {
		mockedSignupUser.mockResolvedValue({
			success: false,
			error: "Password does not meet requirements",
			result: null,
		});

		//

		render(<Signup />);
		const signupBtn = screen.getByRole("button", { name: "Signup" });

		// user event

		await user.type(screen.getByLabelText(/^name$/i), "test");
		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(signupBtn);

		// assertion

		expect(screen.getByTestId("error")).toHaveTextContent(
			"Password does not meet requirements"
		);
	});

	//

	it("should route user to confirm email", async () => {
		// mock resolved values
		mockedSignupUser.mockResolvedValue({
			success: true,
			error: "",
			result: {
				nextStep: {
					signUpStep: "CONFIRM_SIGN_UP",
					codeDeliveryDetails: {
						deliveryMedium: "EMAIL",
						destination: "test@example.com",
					},
				},
				isSignUpComplete: false,
			},
		});

		//
		render(<Signup />);
		const signupBtn = screen.getByRole("button", { name: /^signup$/i });

		// user event

		await user.type(screen.getByLabelText(/^name$/i), "test");
		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(signupBtn);

		// assertions
		expect(mockedPush).toBeCalledWith("/auth/confirmEmail");
	});
});
