"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchAuthSession, SignInOutput } from "aws-amplify/auth";

// ui
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// store
import { useUserStore } from "@/store/userStore";

// zod
import { LoginFormSchema, LoginFormState } from "@/libs/definitions";

// auth
import { loginUser } from "@/libs/cognito/existingUser/loginUser";

const initialState: LoginFormState = {
	formValidationErrors: { email: [], password: [] },
	error: "",
	message: "",
	success: false,
};

const Login = () => {
	const router = useRouter();
	// zustand user state function
	const { fetchUser } = useUserStore();

	// local states
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		try {
			// Extract form data
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			// Validate form with Zod
			const validated = LoginFormSchema.safeParse({ email, password });
			if (!validated.success) {
				setState({
					...initialState,
					formValidationErrors: validated.error.flatten().fieldErrors,
					error: "Please fix the highlighted errors",
				});
				setPending(false);
				return;
			}

			// Call Cognito login service
			const { success, error, result } = await loginUser(email, password);

			// on failure return
			if (!success) {
				setState(prev => ({ ...prev, error: error }));
				setPending(false);
				return;
			}

			// success
			const { nextStep, isSignedIn } = result as SignInOutput;

			// Route unconfirmed users
			if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
				setState({
					...initialState,
					success: true,
					message: "Please confirm your email",
				});
				router.push("/confirmEmail");
				setPending(false);
				return;
			}

			// Signed-in users
			if (isSignedIn) {
				// Fetch session token and save to backend
				const sessions = await fetchAuthSession();

				const idToken = sessions.tokens?.idToken?.toString();

				const tokenExp = sessions.tokens?.idToken?.payload.exp;

				// set tokens in middleware
				await fetch("/api/auth/setToken", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ idToken, tokenExp }),
				});

				// send idToken to the api route handler to be decoded

				await fetch("/api/user/init", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${idToken}`,
					},
				});

				// Update global user state
				await fetchUser();

				// Redirect to protected page
				setState({
					...initialState,
					success: true,
					message: "Successfully logged in",
				});
				router.push("/dashboard");
				setPending(false);
				return;
			}

			// Fallback if login somehow incomplete
			setState({
				...initialState,
				message: "Check your email to confirm.",
			});
		} catch (error: unknown) {
			let message =
				error instanceof Error
					? error.message
					: "Unexpected error. Please try again";
			setState({ ...initialState, error: message });
			setPending(false);
		}
	};

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
				<CardAction>
					<Link href={"/signup"}>
						<Button variant="link">SIGN UP</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							name="email"
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
						<div className="text-red-600 flex flex-col text-xs">
							{state?.formValidationErrors.email?.map(
								(err: string, index: number) => (
									<span key={index}>{err}</span>
								)
							)}
						</div>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href={"/forgotPassword"}
								className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
							>
								Forgot your password?
							</Link>
						</div>
						<div className="text-red-600 flex flex-col text-xs">
							{state?.formValidationErrors.password?.map(
								(err: string, index: number) => (
									<span key={index}>{err}</span>
								)
							)}
						</div>
						<Input name="password" id="password" type="password" required />
						<span data-testid="error" className="text-xs text-red-600">
							{state?.error}
						</span>
					</div>
					<Button
						aria-disabled={pending}
						disabled={pending}
						type="submit"
						className="w-full"
					>
						{pending ? <Loader2Icon className="animate-spin" /> : "Login"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button variant="outline" className="w-full">
					Login with Google
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Login;
