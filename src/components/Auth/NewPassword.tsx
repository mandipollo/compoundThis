"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// auth
import {
	ConfirmNewPasswordFormSchema,
	ConfirmPasswordResetFormState,
} from "@/libs/definitions";
import { confirmResetPasswordHandler } from "@/libs/cognito/existingUser/confirmResetPasswordHandler";
// ui
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

const initialState: ConfirmPasswordResetFormState = {
	formValidationErrors: { username: [], confirmationCode: [], newPassword: [] },
	success: false,
	message: "",
	error: "",
};
const NewPassword = () => {
	// route

	const route = useRouter();
	//
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		try {
			// Extract form data
			const formData = new FormData(e.currentTarget);
			const username = formData.get("username") as string;
			const confirmationCode = formData.get("confirmationCode") as string;
			const newPassword = formData.get("newPassword") as string;

			// Validate form with Zod
			const validated = ConfirmNewPasswordFormSchema.safeParse({
				username,
				newPassword,
				confirmationCode,
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

			// Call Cognito login service
			const { success, error } = await confirmResetPasswordHandler(
				username,
				newPassword,
				confirmationCode
			);

			//

			if (!success) {
				setState({ ...initialState, error: error });
				setPending(false);
				return;
			}

			if (success) {
				setState({
					...initialState,
					message: "Password reset",
					success: true,
				});
				setPending(false);
				route.push("/auth/login");
				return;
			}
		} catch (error) {
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
				<CardTitle>Reset new password!</CardTitle>
				<CardDescription>Enter code and the new password</CardDescription>
				<CardAction>
					<Button variant="link">Resend Code</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<div className="grid gap-2">
							<Label htmlFor="username">Email</Label>
							<Input
								name="username"
								id="username"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						{state?.formValidationErrors.username && (
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.formValidationErrors.username}</p>
							</div>
						)}
						<div className="grid gap-2">
							<Label htmlFor="confirmationCode">Confirmation Code</Label>
							<Input
								name="confirmationCode"
								id="confirmationCode"
								type="number"
								required
							/>
						</div>
						{state?.formValidationErrors.confirmationCode && (
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.formValidationErrors.confirmationCode}</p>
							</div>
						)}
						<div className="grid gap-2">
							<Label htmlFor="newPassword">New Password</Label>
							<Input name="newPassword" id="newPassword" type="text" required />
						</div>
						{state?.formValidationErrors.newPassword && (
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.formValidationErrors.newPassword}</p>
							</div>
						)}
						<Button
							aria-disabled={pending}
							disabled={pending}
							type="submit"
							className="w-full"
						>
							Submit
						</Button>
						{state?.error && (
							<div
								data-testid="error"
								className="text-red-600 flex flex-col text-xs"
							>
								<p>{state?.error}</p>
							</div>
						)}
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default NewPassword;
