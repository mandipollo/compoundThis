"use client";

//
import { handleForgotPassword } from "@/libs/cognitoActions";
import Link from "next/link";
import React, { useActionState } from "react";

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
import { ForgotPasswordFormState } from "@/libs/definitions";

const initialState: ForgotPasswordFormState = {
	error: "",
	success: false,
	message: "",
};
const ForgotPassword = () => {
	const [state, action, pending] = useActionState(
		handleForgotPassword,
		initialState
	);

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
				<form action={action}>
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
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.error}</p>
							</div>
						</div>

						<Button disabled={pending} type="submit" className="w-full">
							Submit
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default ForgotPassword;
