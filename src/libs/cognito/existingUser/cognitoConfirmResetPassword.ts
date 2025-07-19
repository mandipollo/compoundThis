import {
	confirmResetPassword,
	type ConfirmResetPasswordInput,
} from "aws-amplify/auth";

// zod schema
import {
	confirmPasswordResetFormState,
	ConfirmNewPasswordFormSchema,
} from "@/libs/definitions";

// redirects in try catch returns redirectError =>>>> redirects needs to be caught and thrown for next js to handle it

//TODO:
// retrieve username when directed from the resetpassword section
// auto login user when code is accepted
export async function handleConfirmResetPassword(
	state: confirmPasswordResetFormState,
	formData: FormData
) {
	try {
		const username = formData.get("username")?.toString();
		const confirmationCode = formData.get("confirmationCode")?.toString();
		const newPassword = formData.get("newPassword")?.toString();

		// Validate form fields
		const validatedFields = ConfirmNewPasswordFormSchema.safeParse({
			username: formData.get("email"),
			newPassword: formData.get("password"),
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
		const result = await confirmResetPassword({
			username,
			confirmationCode,
			newPassword,
		} as ConfirmResetPasswordInput);
		return {
			message: "",
			formValidationErrors: {
				confirmationCode: [],
				username: [],
				newPassword: [],
			},
			error: "Something went wrong",
			success: false,
		};
	} catch (error) {
		let errorMessage = "Something went wrong";

		switch (error) {
			case "CodeMismatchException":
				errorMessage = "Code is invalid";
				break;

			default:
				errorMessage = "Something went wrong";
				break;
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
