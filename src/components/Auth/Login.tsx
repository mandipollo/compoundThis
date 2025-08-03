"use client";

//
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useUserStore } from "@/store/userStore";

import { LoginFormSchema, LoginFormState } from "@/libs/definitions";
import { fetchAuthSession, SignInOutput } from "aws-amplify/auth";
import { loginUser } from "@/libs/cognito/existingUser/loginUser";
import { stringify } from "querystring";

const initialState: LoginFormState = {
	formValidationErrors: { email: [], password: [] },
	error: "",
	message: "",
	success: false,
};

//TODO: store user access token to be used in middleware
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

		// form inputs
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// ✅ Validate with Zod
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

		//  Call cognito signup
		const { success, error, result } = await loginUser(email, password);

		// success false
		if (!success) {
			setState({ ...initialState, error });
			setPending(false);
			return;
		}

		// retrieve output from cognito signin
		const { nextStep, isSignedIn } = result as SignInOutput;

		// redirect unconfirmed user
		if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
			router.push("/auth/confirmEmail");
			return {
				formValidationErrors: { email: [], password: [] },
				error: "",
				success: true,
				message: "Please confirm email",
			};
		}
		if (isSignedIn) {
			// pass token to the api route hander
			const sessions = await fetchAuthSession();
			const idToken = sessions.tokens?.idToken?.toString();

			await fetch("/api/auth/setToken", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken }),
			});

			// zustand user state
			await fetchUser();

			// redirect user to protected routes
			router.push("/user");
			return {
				formValidationErrors: { email: [], password: [] },
				error: "",
				success: true,
				message: "Successfully logged in",
			};
		} else {
			setState({ ...initialState, message: "Check your email to confirm." });
		}
		setPending(false);
	};

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
				<CardAction>
					<Link href={"/auth/signup"}>
						<Button variant="link">SIGN UP</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
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
									href={"/auth/forgotPassword"}
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
							<span className="text-xs text-red-600">{state?.error}</span>
						</div>
						<Button disabled={pending} type="submit" className="w-full">
							Login
						</Button>
					</div>
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
