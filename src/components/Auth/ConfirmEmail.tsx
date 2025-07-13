"use client";
import React, { useActionState } from "react";
import { handleConfirmSignUp } from "@/libs/cognitoActions";

const ConfirmEmail = () => {
	const [state, action, pending] = useActionState(
		handleConfirmSignUp,
		undefined
	);
	return (
		<form
			className="grid grid-cols-1 gap-2 rounded-md shadow-xl p-4"
			action={action}
		>
			<h2 className="text-xl">Please verify your account.</h2>
			<div className="flex flex-col gap-2">
				<label htmlFor="email">Email</label>
				<input
					name="email"
					placeholder="Enter email"
					className="border p-2 rounded-md"
					type="email"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="code">Verification Code</label>
				<input
					name="code"
					placeholder="Enter code"
					className="border p-2 rounded-md"
					type="text"
				/>
			</div>
			<button
				aria-disabled={pending}
				type="submit"
				className="border bg-primary text-white rounded-md p-2"
			>
				SUBMIT
			</button>
		</form>
	);
};

export default ConfirmEmail;
