import { resetPassword } from "aws-amplify/auth";
// zod schema
import { ForgotPasswordFormSchema } from "@/libs/definitions";

// TODO:
// alert user code has been sent to the user's email

export async function resetPasswordUser(username: string) {
	try {
		const validatedFields = ForgotPasswordFormSchema.safeParse({
			username: username,
		});

		if (!validatedFields.success) {
			const fieldArrays = validatedFields.error.flatten().fieldErrors;
			return {
				formValidationError: fieldArrays?.username?.[0] || "",
				error: "Please fix the highlighted error",
				success: false,
				message: "",
			};
		}
		const output = await resetPassword({ username });

		return {
			output,
			error: "",
			message: "Code has been sent successfully",
			success: true,
		};
	} catch (error: any) {
		let errorMessage = "Something went wrong";
		switch (error.name) {
			case "LimitExceededException":
				errorMessage = "Too many requests in a short time";
				break;
			case "TooManyRequestsException":
				errorMessage = "You are hitting Cognito rate limit";
				break;
			default:
				errorMessage = "Something went wrong";
		}
		return {
			output: undefined,
			message: "",
			error: errorMessage,
			success: false,
		};
	}
}
