"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpOutput } from "aws-amplify/auth";
// auth
import { signUpUser } from "@/libs/cognito/newUser/signupUser";
import { SignupFormSchema, SignupFormState } from "@/libs/definitions";
import Link from "next/link";
// ui
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";

const initialState: SignupFormState = {
	formValidationErrors: { name: [], email: [], password: [] },
	message: "",
	error: "",
	success: false,
};

const Signup = () => {
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		try {
			const formData = new FormData(e.currentTarget);
			const name = formData.get("name") as string;
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			// Validate with Zod
			const validated = SignupFormSchema.safeParse({
				name,
				email,
				password,
			});
			if (!validated.success) {
				setState({
					...initialState,
					formValidationErrors: validated.error.flatten().fieldErrors,
					error: "Please fix the highlighted errors",
				});
				setPending(false);
				return;
			}

			// Try Cognito sign up
			const { success, error, result } = await signUpUser(
				name,
				email,
				password
			);

			if (!success) {
				setState({ ...initialState, error });
				setPending(false);
				return;
			}

			const { isSignUpComplete, nextStep } = result as SignUpOutput;

			if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
				router.push("/auth/confirmEmail");
			} else if (isSignUpComplete) {
				router.push("/user");
			} else {
				setState({
					...initialState,
					message: "Check your email to confirm.",
				});
			}

			setPending(false);
		} catch (error: unknown) {
			let message = "";
			if (error instanceof Error) {
				message = error.message ?? "Unexpected error. Please try again";
			}
			setState({
				...initialState,
				error: message,
			});
			setPending(false);
		}
	};

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Create your account</CardTitle>
				<CardAction>
					<Link href={"/auth/login"}>
						<Button variant="link">LOGIN</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						{/* Name input */}
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input name="name" id="name" placeholder="Josh" />
							{state.formValidationErrors.name?.map((err, i) => (
								<span key={i} className="text-xs text-red-600">
									{err}
								</span>
							))}
						</div>
						{/* Email input */}
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input name="email" id="email" type="email" />
							{state.formValidationErrors.email?.map((err, i) => (
								<span key={i} className="text-xs text-red-600">
									{err}
								</span>
							))}
						</div>
						{/* Password input */}
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" id="password" type="password" />
							{state.formValidationErrors.password?.map((err, i) => (
								<span key={i} className="text-xs text-red-600">
									{err}
								</span>
							))}
						</div>

						<Button
							aria-disabled={pending}
							disabled={pending}
							type="submit"
							className="w-full"
						>
							{pending ? <Loader2Icon className="animate-spin" /> : "Signup"}
						</Button>
						<span data-testid="error" className="text-xs text-red-600">
							{state.error}
						</span>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="w-full">
					Login with Google
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Signup;
