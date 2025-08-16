// mock useRouter

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

// mock zustand store's fetchuser funciton

const mockFetchUser = vi.fn();
vi.mock("@/store/userStore", () => ({
	useUserStore: () => ({
		fetchUser: mockFetchUser,
	}),
}));

// mock cognito function

vi.mock("@/libs/cognito/existingUser/loginUser", () => ({
	loginUser: vi.fn(),
}));

vi.mock("aws-amplify/auth", () => ({
	fetchAuthSession: vi.fn(),
}));

const mockedLoginUser = vi.mocked(loginUser);
const mockedFetchAuthSession = vi.mocked(fetchAuthSession);
// mock fetch function

const mockFetch = vi.stubGlobal(
	"fetch",
	vi.fn().mockResolvedValue({
		json: () => Promise.resolve({}),
		status: 200,
	})
);
// imports
import React from "react";
import { vi, describe, it, expect, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { fetchAuthSession } from "aws-amplify/auth";
import { loginUser } from "@/libs/cognito/existingUser/loginUser";
import Login from "@/components/Auth/Login";

const user = userEvent.setup();
//

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

describe("Login component", () => {
	// Test initial component render
	it("should render the login form with all the inputs and button ", async () => {
		render(<Login />);

		const logBtn = screen.getByRole("button", { name: /^login$/i });
		const logGoogleBtn = screen.getByRole("button", {
			name: /^login with google$/i,
		});
		const signupLink = screen.getByRole("link", { name: /^sign up$/i });
		const forgotPasswordLink = screen.getByRole("link", {
			name: /^forgot your password\?$/i,
		});
		// assertions
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(logBtn).toBeInTheDocument();
		expect(logGoogleBtn).toBeInTheDocument();
		expect(signupLink).toBeInTheDocument();
		expect(forgotPasswordLink).toBeInTheDocument();
	});

	// Test errors are correctly being rendered

	it("should correctly render User does not exist on error span element", async () => {
		// mock resolved value
		mockedLoginUser.mockResolvedValue({
			success: false,
			result: undefined,
			error: "User does not exist",
		});

		// render

		render(<Login />);

		// user event

		const logBtn = screen.getByRole("button", { name: /^login$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123");
		await user.click(logBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"User does not exist"
		);
	});

	it("should correctly render Incorrect email or password on error span element", async () => {
		// mock resolved value
		mockedLoginUser.mockResolvedValue({
			success: false,
			result: undefined,
			error: "Incorrect email or password",
		});

		// render

		render(<Login />);

		// user event

		const logBtn = screen.getByRole("button", { name: /^login$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123");
		await user.click(logBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Incorrect email or password"
		);
	});

	it("should correctly render User not confirmed on error span element", async () => {
		// mock resolved value
		mockedLoginUser.mockResolvedValue({
			success: false,
			result: undefined,
			error: "User not confirmed",
		});

		// render

		render(<Login />);

		// user event

		const logBtn = screen.getByRole("button", { name: /^login$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123");
		await user.click(logBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"User not confirmed"
		);
	});

	it("should correctly render Unexpected error. Please try again on error span element", async () => {
		// mock resolved value
		mockedLoginUser.mockResolvedValue({
			success: false,
			result: undefined,
			error: "Unexpected error. Please try again",
		});

		// render

		render(<Login />);

		// user event

		const logBtn = screen.getByRole("button", { name: /^login$/i });

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123");
		await user.click(logBtn);

		// assertion

		expect(screen.getByTestId(/^error$/i)).toHaveTextContent(
			"Unexpected error. Please try again"
		);
	});

	// success scenarios
	it("should show loading state and disable the button during submission than navigate user to /user", async () => {
		//  mock unresolved promise for pending state

		let loginPromiseResolver: (
			value: Awaited<ReturnType<typeof mockedLoginUser>>
		) => void;
		const loginPromise = new Promise<
			Awaited<ReturnType<typeof mockedLoginUser>>
		>(resolve => {
			loginPromiseResolver = resolve;
		});
		mockedLoginUser.mockReturnValue(loginPromise);

		// mock fetchAuthSession
		let fetchAuthSessionPromiseResolver: (
			value: Awaited<ReturnType<typeof mockedFetchAuthSession>>
		) => void;
		const fetchAuthSessionPromise = new Promise<
			Awaited<ReturnType<typeof mockedFetchAuthSession>>
		>(resolve => {
			fetchAuthSessionPromiseResolver = resolve;
		});

		mockedFetchAuthSession.mockReturnValue(fetchAuthSessionPromise);

		render(<Login />);

		const logBtn = screen.getByRole("button", { name: /^login$/i });

		// assert inital state

		expect(logBtn).toBeEnabled();
		expect(logBtn).toHaveTextContent("Login");

		// User events

		await user.type(screen.getByLabelText(/email/i), "test@example.com");
		await user.type(screen.getByLabelText(/password/i), "Password123@");
		await user.click(logBtn);

		// assert loading state

		expect(logBtn).toHaveAttribute("aria-disabled", "true");

		// resolve the promise

		await act(async () => {
			loginPromiseResolver({
				success: true,
				error: "",
				result: { isSignedIn: true, nextStep: { signInStep: "DONE" } },
			});
			fetchAuthSessionPromiseResolver({
				tokens: {
					idToken: { toString: () => "mock-id-token", payload: { exp: 123 } },
					accessToken: {
						toString: () => "mock-access-token",
						payload: { exp: 123 },
					},
				},
			});
		});

		// assert user has been routed to user page

		expect(mockPush).toBeCalledWith("/user");
	});

	it("redirects unconfirmed users to /auth/confirmEmail", async () => {
		// mock response

		mockedLoginUser.mockResolvedValueOnce({
			success: true,
			error: "",
			result: {
				isSignedIn: false,
				nextStep: { signInStep: "CONFIRM_SIGN_UP" },
			},
		});
		// render component

		render(<Login />);

		// assert initial state

		const logBtn = screen.getByRole("button", { name: /^login$/i });
		expect(logBtn).toBeEnabled();

		// user events

		await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
		await user.type(screen.getByLabelText(/^password$/i), "Password123@");
		await user.click(logBtn);

		// assert

		expect(mockPush).toBeCalledWith("/auth/confirmEmail");
	});
});
