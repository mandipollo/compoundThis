import { redirect } from "next/navigation";
import { signUp } from "aws-amplify/auth";

// zod schema
import { SignupFormSchema, FormState } from "@/libs/definitions";
import { isRedirectError } from "next/dist/client/components/redirect-error";
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
