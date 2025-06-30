"use client";

//
import { Button } from "../ui/button";
import { handleSignin } from "@/libs/cognitoActions";
import Link from "next/link";
import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

const formSchema = z.object({
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters",
	}),
});

const Login = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	const [state, action, pending] = useActionState(handleSignin, undefined);

	return (
		<Form {...form}>
			<form
				className="grid grid-cols-1 gap-2 rounded-md shadow-xl p-4"
				action={action}
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<Input
						name="email"
						placeholder="Enter your email address"
						type="email"
					></Input>
				</div>
				{state?.errors?.email && (
					<p className="text-red-500">{state.errors.email}</p>
				)}
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Password</label>
					<Input
						name="password"
						placeholder="Enter password"
						className="border p-2 rounded-md"
						type="password"
					></Input>
				</div>
				{state?.errors?.password && (
					<p className="text-red-500">{state.errors.password}</p>
				)}

				<Button aria-disabled={pending} type="submit">
					SIGN IN
				</Button>

				<div className="flex flex-row space-x-2 justify-center">
					<p>Don&apos;t have an account?</p>
					<Link href={"/auth/signup"}>Sign Up</Link>
				</div>
			</form>
		</Form>
	);
};

export default Login;
