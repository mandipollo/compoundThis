import { redirect } from "next/navigation";
import { signIn, resendSignUpCode } from "aws-amplify/auth";

// zod schema
import { LoginFormSchema, LoginFormState } from "@/libs/definitions";

// redirects in try catch returns redirectError =>>>> redirects needs to be caught and thrown for next js to handle it

///////////////////// existing users
export async function handleLogin(
	state: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	try {
		// Validate form fields
		const validatedFields = LoginFormSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password"),
		});

		// return on invalid form fields
		if (!validatedFields.success) {
			return {
				formValidationErrors: validatedFields.error.flatten().fieldErrors,
				error: "Please fix the highlighted errors",
				success: false,
				message: "",
			};
		}
		//
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
			return {
				formValidationErrors: { email: [], password: [] },
				error: "",
				success: true,
				message: "Please confirm email",
			};
		}
		if (isSignedIn) {
			return {
				formValidationErrors: { email: [], password: [] },
				error: "",
				success: true,
				message: "Successfully logged in",
			};
		}
		// default fallback
		return {
			formValidationErrors: { email: [], password: [] },
			error: "Something went wrong",
			success: true,
			message: "",
		};
	} catch (error: any) {
		// if (isRedirectError(error)) {
		// 	throw error;
		// }
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

		console.error("Error details:", {
			name: error?.name,
			message: error?.message,
			code: error?.code, // some Amplify errors use code instead of name
			error,
		});

		return {
			formValidationErrors: { email: [], password: [] },
			error: errorMessage,
			success: false,
			message: "",
		};
	}
}
