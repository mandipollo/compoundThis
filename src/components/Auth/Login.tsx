"use client";

//
import { handleLogin } from "@/libs/cognito/existingUser/cognitoLogin";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
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

import { LoginFormState } from "@/libs/definitions";
import { fetchAuthSession } from "aws-amplify/auth";

const initialState: LoginFormState = {
	formValidationErrors: { email: [], password: [] },
	error: "",
	message: "",
	success: false,
};

//TODO: store user session to be used in middleware
const Login = () => {
	const router = useRouter();
	const [state, action, pending] = useActionState(handleLogin, initialState);

	// sync user state to zustand && set a cookie to be used by middleware for routing when log in is successful
	const { fetchUser } = useUserStore();
	useEffect(() => {
		if (state?.success) {
			const syncUser = async () => {
				await fetchUser();
				const userSession = await fetchAuthSession();
				const userId = userSession?.tokens?.idToken?.toString();

				const response = await fetch("/auth/login/api", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId }),
				});

				router.push("/user");
			};
			syncUser();
		}
	}, [state?.success]);
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
				<form action={action}>
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
