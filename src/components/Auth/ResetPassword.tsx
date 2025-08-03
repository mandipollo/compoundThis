"use client";

//
import { handleForgotPassword } from "@/libs/cognito/existingUser/cognitoForgotPassword";
import Link from "next/link";
import React, { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	ForgotPasswordFormSchema,
	ForgotPasswordFormState,
} from "@/libs/definitions";
import { resetPasswordUser } from "@/libs/cognito/existingUser/resetPasswordUser";
import { ResetPasswordOutput } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const initialState: ForgotPasswordFormState = {
	formValidationError: "",
	error: "",
	success: false,
	message: "",
};
const ForgotPassword = () => {
	const router = useRouter();
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);
		try {
			const formData = new FormData(e.currentTarget);
			const username = formData.get("username") as string;

			// ✅ Validate with Zod
			const validated = ForgotPasswordFormSchema.safeParse({ username });
			if (!validated.success) {
				const fieldArrays = validated.error.flatten().fieldErrors;
				setState({
					...initialState,
					formValidationError: fieldArrays?.username?.[0] || "",

					error: "Please fix the highlighted errors",
				});
				setPending(false);
				return;
			}

			const { output, error, message, success } =
				await resetPasswordUser(username);
			const { nextStep } = output as ResetPasswordOutput;

			if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
				router.push("/auth/newPassword");
				return {
					formValidationError: "",
					success: true,
					message: `A confirmation code has been sent to your ${
						nextStep.codeDeliveryDetails?.deliveryMedium || "email"
					}.`,
					error: "",
				};
			}
		} catch (error: any) {
			let errorMessage = "Something went wrong";
			switch (error.name) {
				case "UserNotFoundException":
					errorMessage = "User does not exist";
					break;
				case "LimitExceededException":
					errorMessage = "Too many requests in a short time";
					break;
				case "TooManyRequestsException":
					errorMessage = "You are hitting Cognito rate limit";
					break;
				default:
					errorMessage = "Something went wrong";
			}
			return {
				formValidationError: "",
				message: "",
				error: errorMessage,
				success: false,
			};
		}
	};

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Forgot Password?</CardTitle>
				<CardDescription>
					Enter your email below to recieve a code
				</CardDescription>
				<CardAction>
					<Link href={"/auth/login"}>
						<Button variant="link">Login</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<div className="grid gap-2">
							<Label htmlFor="username">Email</Label>
							<Input
								name="username"
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
							{state?.formValidationError && (
								<div className="text-red-600 flex flex-col text-xs">
									<p>{state?.formValidationError}</p>
								</div>
							)}
						</div>

						<Button disabled={pending} type="submit" className="w-full">
							Submit
						</Button>
						{state?.error && (
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.error}</p>
							</div>
						)}
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default ForgotPassword;
