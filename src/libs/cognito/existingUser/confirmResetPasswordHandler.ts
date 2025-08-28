import { confirmResetPassword } from "aws-amplify/auth";

//TODO:
// retrieve username when directed from the resetpassword section
// auto login user when code is accepted
export async function confirmResetPasswordHandler(
	username: string,
	newPassword: string,
	confirmationCode: string
): Promise<{
	success: boolean;
	error: string;
}> {
	try {
		// throws void on success , aws please throw success : true atleast .
		await confirmResetPassword({
			username,
			confirmationCode,
			newPassword,
		});

		return { success: true, error: "" };
	} catch (error: any) {
		let errorMessage = "Unexpected error. Please try again";

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
				errorMessage = "Unexpected error. Please try again";
		}
		return {
			error: errorMessage,
			success: false,
		};
	}
}
