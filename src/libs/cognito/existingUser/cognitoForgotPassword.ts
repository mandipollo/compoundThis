import { redirect } from "next/navigation";
import { resetPassword } from "aws-amplify/auth";

// zod schema
import {
	ForgotPasswordFormState,
	ForgotPasswordFormSchema,
} from "@/libs/definitions";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// redirects in try catch returns redirectError =>>>> redirects needs to be caught and thrown for next js to handle it

// TODO:
// alert user code has been sent to the user's email

export async function handleForgotPassword(
	state: ForgotPasswordFormState,
	formData: FormData
): Promise<ForgotPasswordFormState> {
	try {
		const username = String(formData.get("username"));
		const validatedFields = ForgotPasswordFormSchema.safeParse({
			username: formData.get("username"),
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
		const { nextStep } = output;

		if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
			redirect("/auth/newPassword");
			return {
				formValidationError: "",
				success: true,
				message: `A confirmation code has been sent to your ${
					nextStep.codeDeliveryDetails?.deliveryMedium || "email"
				}.`,
				error: "",
			};
		}
		return {
			formValidationError: "",
			success: false,
			message: "",
			error: "Something went wrong",
		};
	} catch (error: any) {
		if (isRedirectError(error)) {
			throw error;
		}

		let errorMessage = "Something went wrong";
		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist";
				break;
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
			formValidationError: "",
			message: "",
			error: errorMessage,
			success: false,
		};
	}
}
