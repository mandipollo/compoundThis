"use client";
import { handleSignin } from "@/libs/cognitoActions";
import Link from "next/link";
import React, { useActionState } from "react";

const Login = () => {
	const [state, action, pending] = useActionState(handleSignin, undefined);

	return (
		<form
			className="grid grid-cols-1 gap-2 rounded-md shadow-xl p-4"
			action={action}
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input
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
					name="password"
					placeholder="Enter password"
					className="border p-2 rounded-md"
					type="password"
				/>
			</div>
			{state?.errors?.password && (
				<p className="text-red-500">{state.errors.password}</p>
			)}

			<button
				aria-disabled={pending}
				type="submit"
				className="border bg-primary text-white rounded-md p-2"
			>
				SIGN IN
			</button>

			<div className="flex flex-row space-x-2 justify-center">
				<p>Don&apos;t have an account?</p>
				<Link href={"/auth/signup"}>Sign Up</Link>
			</div>
		</form>
	);
};

export default Login;
