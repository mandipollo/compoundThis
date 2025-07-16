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
	ConfirmFormSchema,
	ConfirmSignupFormState,
} from "@/libs/definitions";
import getErrorMessage from "@/utils/get-error-message";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// redirects in try catch returns redirectError =>>>> redirects needs to be caught and thrown for next js to handle it

///////////////////// existing users
export async function handleLogin(
	state: FormState,
	formData: FormData
): Promise<FormState> {
	try {
		// Validate form fields
		const validatedFields = LoginFormSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password"),
		});

		// return on invalid form fields
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				success: false,
				message: "Please fix the highlighted errors",
			};
		}
		//  handle expected errors
		const result = await signIn({
			username: String(formData.get("email")),
			password: String(formData.get("password")),
		});

		const { nextStep, isSignedIn } = result;
		// redirect unconfirmed user
		if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
			await resendSignUpCode({
				username: String(formData.get("email")),
			});
			redirect("/auth/confirmEmail");
			return { errors: {}, success: true, message: "Please confirm email" };
		}
		if (isSignedIn) {
			return { errors: {}, success: true, message: "Successfully loggedin" };
		}
		// default fallback
		return {
			errors: {},
			success: false,
			message: "Something went wrong",
		};
	} catch (error: any) {
		let errorMessage = "Unexpected error has occurred!";

		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist.";
				break;
			case "NotAuthorizedException":
				errorMessage = "Incorrect email or password.";
				break;
			case "UserNotConfirmedException":
				errorMessage = "User not confirmed.";
				break;
			default:
				errorMessage = "Unexpected error. Please try again";
		}

		return { errors: {}, success: false, message: errorMessage };
	}
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
// auto login user when code is accepted
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

//////////////////// new users

export async function handleSignUp(
	state: FormState,
	formData: FormData
): Promise<FormState> {
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
				success: false,
				message: "Please fix the highlighted errors",
			};
		}

		// amplify automatically sends verification code to the users email
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
		});

		const { isSignUpComplete, nextStep } = result;

		//
		if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
			redirect("/auth/confirmEmail");
		}
		if (isSignUpComplete) {
			redirect("/user");
		}

		return {
			errors: {},
			success: false,
			message: "Error has occurred!",
		};
	} catch (error: any) {
		if (isRedirectError(error)) {
			throw error;
		}

		let errorMessage = "Something went wrong. Please try agian";

		switch (error.name) {
			case "UsernameExistsException":
				errorMessage = "Username is already taken";
				break;
			case "LimitExceededException":
				errorMessage = "Too many attempts. Please try again later";
				break;
			case "InvalidPasswordException": // cognito password policy
				errorMessage = "Password does not meet requirements";
				break;
			default:
				errorMessage = "Something went wrong. Please try agian";
				break;
		}

		return { errors: {}, success: false, message: errorMessage };
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

// verify code sent to the email address
export async function handleConfirmSignUp(
	state: ConfirmSignupFormState,
	formData: FormData
) {
	try {
		// Validate form fields
		const validatedFields = ConfirmFormSchema.safeParse({
			email: formData.get("email"),
			code: formData.get("code"),
		});

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			const fieldArrays = validatedFields.error.flatten().fieldErrors;
			return {
				errors: {
					email: fieldArrays.email?.[0] ?? "",
					code: fieldArrays.code?.[0] ?? "",
				},
				success: false,
				message: "Please fix the highlighted errors",
			};
		}

		const { isSignUpComplete } = await confirmSignUp({
			username: String(formData.get("email")),
			confirmationCode: String(formData.get("code")),
		});

		if (isSignUpComplete) {
			redirect("/user");
			return {
				errors: { email: "", code: "" },
				message: "confirmed",
				success: true,
			};
		}

		return {
			errors: { email: "", code: "" },
			success: false,
			message: "Something went wrong",
		};
	} catch (error: any) {
		if (isRedirectError(error)) {
			throw error;
		}
		let errorMessage = "Something went wrong. Please try agian";

		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist";
				break;
			case "CodeMismatchException":
				errorMessage = "Verification code is incorrect";
				break;
			case "ExpiredCodeException":
				errorMessage = "Verification code has expired";
				break;
			case "TooManyFailedAttemptsException":
				errorMessage = "Too many incorrect attempts";
				break;
			default:
				errorMessage = "Something went wrong. Please try agian";
		}

		return {
			errors: { email: "", code: "" },
			message: errorMessage,
			success: false,
		};
	}
}
