"use client";

//

import Link from "next/link";
import React, { useState } from "react";

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
const ResetPassword = () => {
	const router = useRouter();
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		const formData = new FormData(e.currentTarget);
		const username = formData.get("email") as string;

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

		if (!success) {
			return { ...initialState, error: error };
		}
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
		} else {
			setState({ ...initialState, message: "Check your email to confirm." });
		}

		setPending(false);
	};

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Forgot Password?</CardTitle>
				<CardDescription>
					Enter your email below to recieve a code
				</CardDescription>
				<CardAction>
					<Link data-testid="loginLink" href={"/auth/login"}>
						<Button variant="link">Login</Button>
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

							<span className="text-red-600 flex flex-col text-xs">
								{state?.formValidationError}
							</span>
						</div>

						<Button
							aria-disabled={pending}
							disabled={pending}
							type="submit"
							className="w-full"
						>
							Submit
						</Button>

						<span
							data-testid="error"
							className="text-red-600 flex flex-col text-xs"
						>
							{state.error}
						</span>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default ResetPassword;
