import {
	ForgotPasswordFormSchema,
	ResendVerificationCodeFormSchema,
	ResendVerificationCodeFormState,
} from "@/libs/definitions";
import { resendSignUpCode } from "aws-amplify/auth";

// zod schema

export async function handleResendVerificationCode(
	state: ResendVerificationCodeFormState,
	formData: FormData
): Promise<ResendVerificationCodeFormState> {
	try {
		const validatedFields = ResendVerificationCodeFormSchema.safeParse({
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
		const result = await resendSignUpCode({
			username: String(formData.get("username")),
		});

		if (result.deliveryMedium === "EMAIL") {
			return {
				formValidationError: "",
				error: "",
				success: true,
				message: "Verification code emailed successfully",
			};
		}
		return {
			formValidationError: "",
			error: "Somthing went wrong",
			success: false,
			message: "",
		};
	} catch (error: any) {
		let errorMessage = "Something went wrong";

		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist";
				break;
			case "CodeDeliveryFailureException":
				errorMessage = "Failed to deliver the code";
				break;
			default:
				errorMessage = "Something went wrong";
		}

		return {
			formValidationError: "",
			error: errorMessage,
			success: false,
			message: "",
		};
	}
}
