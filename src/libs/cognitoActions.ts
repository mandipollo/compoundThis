import { redirect } from "next/navigation";
import {
	signUp,
	signIn,
	signOut,
	confirmSignUp,
	resendSignUpCode,
} from "aws-amplify/auth";
import {
	SignupFormSchema,
	FormState,
	LoginFormSchema,
} from "@/libs/definitions";
import getErrorMessage from "@/utils/get-error-message";

export async function handleSignUp(state: FormState, formData: FormData) {
	try {
		// Validate form fields
		const validatedFields = SignupFormSchema.safeParse({
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
		});

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const { isSignUpComplete, userId, nextStep } = await signUp({
			username: String(formData.get("email")),
			password: String(formData.get("password")),
			options: {
				userAttributes: {
					email: String(formData.get("email")),
					name: String(formData.get("name")),
				},
				autoSignIn: true,
			},
		});
		// successful sign in

		redirect("/auth/confirmEmail");
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { error: {}, message: errorMessage };
	}
}

export async function handleSendEmailVerificationCode(
	prevState: { message: string; errorMessage: string },
	formData: FormData
) {
	let currentState;
	try {
		await resendSignUpCode({ username: String(formData.get("email")) });
		currentState = {
			...prevState,
			message: "Code sent successfully",
		};
	} catch (error) {
		currentState = { ...prevState, errorMessage: error };
	}
	return currentState;
}

export async function handleConfirmSignUp(prevState: any, formData: FormData) {
	try {
		const { isSignUpComplete, nextStep } = await confirmSignUp({
			username: String(formData.get("email")),
			confirmationCode: String(formData.get("code")),
		});
	} catch (error) {
		return error;
	}
	redirect("/auth/login");
}

export async function handleSignin(
	state: FormState,
	formData: FormData
): Promise<FormState | undefined> {
	let redirectLink = "/dashboard";

	// Validate form fields
	const validatedFields = LoginFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	try {
		const { nextStep } = await signIn({
			username: String(formData.get("email")),
			password: String(formData.get("password")),
		});
		if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
			await resendSignUpCode({
				username: String(formData.get("email")),
			});
			redirectLink = "/auth/confirmEmail";
		}
		redirect(redirectLink);
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { errors: {}, message: errorMessage };
	}
}

export async function handleSignout() {
	try {
		await signOut();
	} catch (error) {
		return error;
	}
	redirect("/auth/login");
}
