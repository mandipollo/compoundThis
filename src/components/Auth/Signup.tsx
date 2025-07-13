"use client";

import { handleSignUp } from "@/libs/cognitoActions";
import Link from "next/link";
import React, { useActionState } from "react";
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
import { FormState } from "@/libs/definitions";

const initialState: FormState = {
	errors: { name: [], email: [], password: [] },
	message: undefined,
	success: false,
};

//TODO: sign up should return the email and forward the value to the confirm email page
const Signup = () => {
	const [state, action, pending] = useActionState(handleSignUp, initialState);

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
				<form action={action}>
					<div className="flex flex-col gap-2">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								name="name"
								id="name"
								type="text"
								placeholder="josh"
								required
							/>
							{state?.errors?.name && (
								<div className="text-red-600 flex flex-col text-xs">
									<span>{state?.errors?.name}</span>
								</div>
							)}
						</div>
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
								{state?.errors?.email?.map(err => (
									<span>{err}</span>
								))}
							</div>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<div className="text-red-600 flex flex-col text-xs">
								{state?.errors?.password?.map(err => (
									<span>{err}</span>
								))}
							</div>
							<Input name="password" id="password" type="password" required />
							<span className="text-xs text-red-600">{state?.message}</span>
						</div>
						<Button disabled={pending} type="submit" className="w-full">
							Signup
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

export default Signup;
