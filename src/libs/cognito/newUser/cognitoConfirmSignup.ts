import { redirect } from "next/navigation";
import { confirmSignUp } from "aws-amplify/auth";

// zod schema
import {
	ConfirmSignUpFormSchema,
	ConfirmSignupFormState,
} from "@/libs/definitions";

import { isRedirectError } from "next/dist/client/components/redirect-error";

//TODO: auto log in user on successfull verification
// verify code sent to the email address
export async function handleConfirmSignUp(
	state: ConfirmSignupFormState,
	formData: FormData
): Promise<ConfirmSignupFormState> {
	try {
		// Validate form fields
		const validatedFields = ConfirmSignUpFormSchema.safeParse({
			email: formData.get("email"),
			code: formData.get("code"),
		});

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			const fieldArrays = validatedFields.error.flatten().fieldErrors;
			return {
				formValidationErrors: {
					email: fieldArrays.email?.[0] ?? "",
					code: fieldArrays.code?.[0] ?? "",
				},
				error: "Please fix the highlighted errors",
				success: false,
				message: "",
			};
		}

		const { isSignUpComplete } = await confirmSignUp({
			username: String(formData.get("email")),
			confirmationCode: String(formData.get("code")),
		});

		if (isSignUpComplete) {
			redirect("/auth/login");
			return {
				formValidationErrors: { email: "", code: "" },
				error: "",
				message: "Verification complete",
				success: true,
			};
		}

		return {
			formValidationErrors: { email: "", code: "" },
			success: false,
			error: "Something went wrong",
			message: "",
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
			formValidationErrors: { email: "", code: "" },
			error: errorMessage,
			message: "",
			success: false,
		};
	}
}
