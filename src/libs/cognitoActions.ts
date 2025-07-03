import { redirect } from "next/navigation";
import {
	signUp,
	signIn,
	signOut,
	confirmSignUp,
	resendSignUpCode,
	resetPassword,
	confirmResetPassword,
	type ConfirmResetPasswordInput,
	type ResetPasswordOutput,
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

// Send confirmation code to user's email
export async function handleForgotPassword(prevState: any, formData: FormData) {
	const username = formData.get("username")?.toString();
	if (!username) {
		return;
	}
	try {
		const output = await resetPassword({ username });
		const { nextStep } = output;

		if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
			return {
				success: true,
				message: `A confirmation code has been sent to your ${
					nextStep.codeDeliveryDetails?.deliveryMedium || "email"
				}.`,
			};
		}
		redirect("/auth/newPassword");
	} catch (err) {
		const errorMessage = getErrorMessage(err);
		return { message: errorMessage };
	}
}

export async function handleConfirmResetPassword(
	prevState: any,
	formData: FormData
) {
	const username = formData.get("username")?.toString();
	const confirmationCode = formData.get("confirmationCode")?.toString();
	const newPassword = formData.get("newPassword")?.toString();

	if (!username || !confirmationCode || !newPassword) {
		return { message: "All fields are required." };
	}

	try {
		await confirmResetPassword({
			username,
			confirmationCode,
			newPassword,
		} as ConfirmResetPasswordInput);
		return { message: "Password reset successful. You can now log in." };
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		return { message: errorMessage };
	}
}
