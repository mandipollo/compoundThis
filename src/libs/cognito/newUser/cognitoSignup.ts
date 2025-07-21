import { redirect } from "next/navigation";
import { signUp } from "aws-amplify/auth";

// zod schema
import { SignupFormSchema, SignupFormState } from "@/libs/definitions";
import { isRedirectError } from "next/dist/client/components/redirect-error";
export async function handleSignUp(
	state: SignupFormState,
	formData: FormData
): Promise<SignupFormState> {
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
				formValidationErrors: validatedFields.error.flatten().fieldErrors,
				error: "Please fix the highlighted errors",
				success: false,
				message: "",
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
			formValidationErrors: { name: [], email: [], password: [] },
			success: false,
			message: "",
			error: "Something went wrong",
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

		return {
			formValidationErrors: { email: [], name: [], password: [] },
			success: false,
			message: "",
			error: errorMessage,
		};
	}
}
