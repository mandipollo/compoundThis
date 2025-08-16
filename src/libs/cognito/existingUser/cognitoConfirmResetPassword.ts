import { confirmResetPassword } from "aws-amplify/auth";

// zod schema
import {
	ConfirmPasswordResetFormState,
	ConfirmNewPasswordFormSchema,
} from "@/libs/definitions";

// redirects in try catch returns redirectError =>>>> redirects needs to be caught and thrown for next js to handle it

//TODO:
// retrieve username when directed from the resetpassword section
// auto login user when code is accepted
export async function handleConfirmResetPassword(
	state: ConfirmPasswordResetFormState,
	formData: FormData
): Promise<ConfirmPasswordResetFormState> {
	try {
		// Validate form fields
		const validatedFields = ConfirmNewPasswordFormSchema.safeParse({
			username: formData.get("username"),
			newPassword: formData.get("newPassword"),
			confirmationCode: formData.get("confirmationCode"),
		});

		// return on invalid form fields
		if (!validatedFields.success) {
			return {
				formValidationErrors: validatedFields.error.flatten().fieldErrors,
				success: false,
				message: "",
				error: "Please fix the highlighted errors",
			};
		}

		// throws void on success , aws please throw success : true atleast .
		await confirmResetPassword({
			username: String(formData.get("username")),
			confirmationCode: String(formData.get("confirmationCode")),
			newPassword: String(formData.get("newPassword")),
		});

		return {
			message: "Password has been changed successfully",
			formValidationErrors: {
				confirmationCode: [],
				username: [],
				newPassword: [],
			},
			error: "",
			success: true,
		};
	} catch (error: any) {
		let errorMessage = "Something went wrong. Please try again";

		switch (error.name) {
			case "CodeMismatchException":
				errorMessage = "Code is invalid";
				break;
			case "ExpiredCodeException":
				errorMessage = "Expired code";
				break;
			case "InvalidParameterException":
				errorMessage = "Invalid parameter";
				break;
			case "InvalidPasswordException":
				errorMessage = "Invalid password";
				break;
			case "LimitExceededException":
				errorMessage = "Limit exceeded";
				break;
			case "PasswordHistoryPolicyViolationException":
				errorMessage = "Password policy voilation";
				break;
			case "UserNotConfirmedException":
				errorMessage = "User not confirmed";
				break;

			default:
				errorMessage = "Something went wrong. Please try again";
		}
		return {
			message: "",
			formValidationErrors: {
				confirmationCode: [],
				username: [],
				newPassword: [],
			},
			error: errorMessage,
			success: false,
		};
	}
}
