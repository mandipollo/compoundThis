import { resetPassword, ResetPasswordOutput } from "aws-amplify/auth";
// TODO:
// alert user code has been sent to the user's email

export async function resetPasswordUser(
	username: string
): Promise<{
	result: ResetPasswordOutput | null;
	error: string;
	message: string;
	success: boolean;
}> {
	try {
		const result = await resetPassword({ username });

		return {
			result,
			error: "",
			message: "Code has been sent successfully",
			success: true,
		};
	} catch (error: any) {
		let errorMessage = "Unexpected error. Please try again";
		switch (error.name) {
			case "LimitExceededException":
				errorMessage = "Too many requests in a short time";
				break;
			case "TooManyRequestsException":
				errorMessage = "You are hitting Cognito rate limit";
				break;
			default:
				errorMessage = "Unexpected error. Please try again";
		}
		return {
			result: null,
			message: "",
			error: errorMessage,
			success: false,
		};
	}
}
