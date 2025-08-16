import { resendSignUpCode } from "aws-amplify/auth";

export async function resendVerificationCode(email: string) {
	try {
		const result = await resendSignUpCode({
			username: email,
		});

		return {
			result,
			error: "",
			success: true,
			message: "Verification code emailed successfully",
		};
	} catch (error: any) {
		let errorMessage = "Unexpected error. Please try again";

		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist";
				break;
			case "CodeDeliveryFailureException":
				errorMessage = "Failed to deliver the code";
				break;
			default:
				errorMessage = "Unexpected error. Please try again";
		}

		return {
			error: errorMessage,
			success: false,
			message: "",
		};
	}
}
