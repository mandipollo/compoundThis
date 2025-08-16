import { resetPassword } from "aws-amplify/auth";
// TODO:
// alert user code has been sent to the user's email

export async function resetPasswordUser(username: string) {
	try {
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
