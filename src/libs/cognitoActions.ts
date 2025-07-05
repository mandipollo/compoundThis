import { redirect } from "next/navigation";
import {
	signUp,
	signIn,
	confirmSignUp,
	resendSignUpCode,
	resetPassword,
	confirmResetPassword,
	type ConfirmResetPasswordInput,
	type ResetPasswordOutput,
} from "aws-amplify/auth";

// zod schema
import {
	SignupFormSchema,
	FormState,
	LoginFormSchema,
} from "@/libs/definitions";
import getErrorMessage from "@/utils/get-error-message";

// FIXME: fix redirects in function - issues try catch clause

export async function handleLogin(
	state: FormState,
	formData: FormData
): Promise<FormState | undefined> {
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
	// Manually handle expected errors
	const result = await signIn({
		username: String(formData.get("email")),
		password: String(formData.get("password")),
	}).catch(err => {
		if (err.name === "UserNotFoundException") {
			return { error: "User does not exist." };
		}
		if (err.name === "NotAuthorizedException") {
			return { error: "Incorrect email or password." };
		}
		if (err.name === "UserNotConfirmedException") {
			return { error: "User not confirmed." };
		}
		return { error: "Something went wrong. Please try again." };
	});

	// If we got an error, return it
	if ("error" in result) {
		return { errors: {}, message: result.error };
	}

	const { nextStep, isSignedIn } = result;
	// redirect unconfirmed user
	if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
		await resendSignUpCode({
			username: String(formData.get("email")),
		});
		redirect("/auth/confirmEmail");
	}
	if (isSignedIn) {
		redirect("/dashboard");
	}
	// default fallback
	return { message: "Unable to login.Try again!" };
}

// user signs up -> send verification email
export async function handleSignUp(state: FormState, formData: FormData) {
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

	// Manually handle expected errors
	const result = await signUp({
		username: String(formData.get("email")),
		password: String(formData.get("password")),
		options: {
			userAttributes: {
				email: String(formData.get("email")),
				name: String(formData.get("name")),
			},
			autoSignIn: true,
		},
	}).catch(err => {
		if (err.name === "UserNotFoundException") {
			return { error: "User does not exist." };
		}
		if (err.name === "NotAuthorizedException") {
			return { error: "Incorrect email or password." };
		}
		if (err.name === "UserNotConfirmedException") {
			return { error: "User not confirmed." };
		}
		return { error: "Something went wrong. Please try again." };
	});

	// If we got an error, return it
	if ("error" in result) {
		return { errors: {}, message: result.error };
	}

	//next steps
	const { isSignUpComplete, nextStep } = result;

	// if signup complete direct to dashboard

	if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
		redirect("/auth/confirmEmail");
	}
	// successful sign in
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

// verify code sent to the email address
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

// TODO:
// alert user code has been sent to the user's email
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

//TODO:
// retrieve username when directed from the resetpassword section
// direct user to login when code is successfully accepted
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
