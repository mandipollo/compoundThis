"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// ui
import { Button } from "../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Loader2Icon } from "lucide-react";

// schema
import {
	ConfirmSignUpFormSchema,
	ConfirmSignupFormState,
} from "@/libs/definitions";

// auth
import { confirmUserEmail } from "@/libs/cognito/newUser/confirmEmailUser";

const initialState: ConfirmSignupFormState = {
	formValidationErrors: { code: "", email: "" },
	error: "",
	success: false,
	message: "",
};
const ConfirmEmail = () => {
	const [state, setState] = useState(initialState);
	const [pending, setPending] = useState(false);
	const router = useRouter();

	//TODO: 		Resend verification code
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		try {
			const formData = new FormData(e.currentTarget);

			const email = formData.get("email") as string;
			const code = formData.get("code") as string;

			//  Validate with Zod
			const validated = ConfirmSignUpFormSchema.safeParse({
				email,
				code,
			});
			if (!validated.success) {
				const fieldArrays = validated.error.flatten().fieldErrors;

				setState({
					...initialState,
					formValidationErrors: {
						email: fieldArrays.email?.[0] ?? "",
						code: fieldArrays.code?.[0] ?? "",
					},
					error: "Please fix the highlighted errors",
					success: false,
				});
				setPending(false);
				return;
			}

			// Cognito sign up
			const { success, error, isSignUpComplete } = await confirmUserEmail(
				email,
				code
			);

			if (!success) {
				setState({ ...initialState, error });
				setPending(false);
				return;
			}

			//
			if (isSignUpComplete) {
				router.push("/login");
			} else {
				setState({ ...initialState, message: "Check your email to confirm." });
			}

			setPending(false);
		} catch (error: unknown) {
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
				<CardTitle>Please verify your account</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="grid grid-cols-1 gap-2 " onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							placeholder="Enter email"
							className="border p-2 rounded-md"
							type="email"
						/>
					</div>
					{state?.formValidationErrors?.email && (
						<span className="text-red-600 flex flex-col text-xs">
							{state.formValidationErrors.email}
						</span>
					)}
					<div className="flex flex-col gap-2">
						<label htmlFor="code">Verification Code</label>
						<input
							id="code"
							name="code"
							placeholder="Enter code"
							className="border p-2 rounded-md"
							type="number"
						/>
					</div>
					{state?.formValidationErrors?.code && (
						<span className="text-red-600 flex flex-col text-xs">
							{state.formValidationErrors.code}
						</span>
					)}
					{state?.error && (
						<span
							data-testid="error"
							className="text-red-600 flex flex-col text-xs"
						>
							{state.error}
						</span>
					)}
					<Button
						aria-disabled={pending}
						disabled={pending}
						type="submit"
						className="border bg-primary text-white rounded-md p-2"
					>
						{pending ? <Loader2Icon className="animate-spin" /> : "Submit"}
					</Button>
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
