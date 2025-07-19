import { redirect } from "next/navigation";
import { signIn, resendSignUpCode } from "aws-amplify/auth";

// zod schema
import { FormState, LoginFormSchema } from "@/libs/definitions";

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
