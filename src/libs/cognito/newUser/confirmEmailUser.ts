import { confirmSignUp } from "aws-amplify/auth";

//TODO: auto log in user on successfull verification
// verify code sent to the email address
export async function confirmUserEmail(email: string, code: string) {
	try {
		const { isSignUpComplete } = await confirmSignUp({
			username: email,
			confirmationCode: code,
		});

		return {
			success: true,
			error: "",
			isSignUpComplete,
			message: "Signup complete",
		};
	} catch (error: any) {
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
				errorMessage = "Something went wrong. Please try again";
		}

		return {
			error: errorMessage,
			success: false,
			message: "",
			isSignUpComplete: null,
		};
	}
}
