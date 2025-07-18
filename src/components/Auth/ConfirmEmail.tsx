"use client";
import React, { useActionState, useEffect } from "react";
import { handleConfirmSignUp } from "@/libs/cognitoActions";
import { Button } from "../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../ui/card";

import { ConfirmSignupFormState } from "@/libs/definitions";

const initialState: ConfirmSignupFormState = {
	errors: {
		email: "",
		code: "",
		error: "",
	},
	success: false,
	message: "",
};
const ConfirmEmail = () => {
	const [state, action, pending] = useActionState(
		handleConfirmSignUp,
		initialState
	);

	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardHeader>
				<CardTitle>Please verify your account</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="grid grid-cols-1 gap-2 " action={action}>
					<div className="flex flex-col gap-2">
						<label htmlFor="email">Email</label>
						<input
							name="email"
							placeholder="Enter email"
							className="border p-2 rounded-md"
							type="email"
						/>
					</div>
					{state?.errors.email && (
						<span className="text-red-600 flex flex-col text-xs">
							{state.errors.email}
						</span>
					)}
					<div className="flex flex-col gap-2">
						<label htmlFor="code">Verification Code</label>
						<input
							name="code"
							placeholder="Enter code"
							className="border p-2 rounded-md"
							type="text"
						/>
					</div>
					{state?.errors.code && (
						<span className="text-red-600 flex flex-col text-xs">
							{state.errors.code}
						</span>
					)}
					{state?.errors.error && (
						<span className="text-red-600 flex flex-col text-xs">
							{state.errors.error}
						</span>
					)}
					<button
						aria-disabled={pending}
						type="submit"
						className="border bg-primary text-white rounded-md p-2"
					>
						SUBMIT
					</button>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button variant="outline" className="w-full">
					Resend verification code
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ConfirmEmail;
