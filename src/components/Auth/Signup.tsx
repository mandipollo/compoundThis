"use client";

import { handleSignUp } from "@/libs/cognitoActions";
import Link from "next/link";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Signup = () => {
	const [state, action, pending] = useActionState(handleSignUp, undefined);

	return (
		<form
			className="grid grid-cols-1 gap-2 rounded-md shadow-xl p-4"
			action={action}
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="name">Name</label>
				<Input id="name" name="name" placeholder="Username" type="text"></Input>
			</div>
			{state?.errors?.name && (
				<p className="text-red-500">{state.errors.name}</p>
			)}
			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					placeholder="Enter your email address"
					className="border p-2 rounded-md"
					type="email"
				/>
			</div>
			{state?.errors?.email && (
				<p className="text-red-500">{state.errors.email}</p>
			)}
			<div className="flex flex-col gap-2">
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					placeholder="Enter password"
					className="border p-2 rounded-md"
					type="password"
				/>
			</div>
			{state?.errors?.password && (
				<div>
					<p>Password must:</p>
					<ul className="text-red-500">
						{state.errors.password.map(error => (
							<li key={error}> {error}</li>
						))}
					</ul>
				</div>
			)}

			<Button type="submit" aria-disabled={pending}>
				SIGN UP
			</Button>

			<div className="flex flex-row space-x-2 justify-center">
				<p>Alreay have an account?</p>
				<Link href={"/auth/login"}>Sign In</Link>
			</div>
		</form>
	);
};

export default Signup;
