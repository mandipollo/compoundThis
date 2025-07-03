"use client";

//
import { handleConfirmResetPassword } from "@/libs/cognitoActions";
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

const ResetPassword = () => {
	const [state, action, pending] = useActionState(
		handleConfirmResetPassword,
		undefined
	);
	console.log(state);

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
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmationCode">Confirmation code</Label>
							<Input
								name="confirmationCode"
								id="confirmationCode"
								type="number"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="newPassword">New Password</Label>
							<Input name="newPassword" id="newPassword" type="text" required />
							<div className="text-red-600 flex flex-col text-xs">
								<p>{state?.message}</p>
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

export default ResetPassword;
