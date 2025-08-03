import { signIn, SignInOutput } from "aws-amplify/auth";

export async function loginUser(
	email: string,
	password: string
): Promise<{
	result: SignInOutput | undefined;
	error: string;
	success: boolean;
}> {
	try {
		const result = await signIn({
			username: email,
			password: password,
		});

		return {
			result,
			error: "",
			success: true,
		};
	} catch (error: any) {
		let errorMessage = "Unexpected error has occurred!";

		switch (error.name) {
			case "UserNotFoundException":
				errorMessage = "User does not exist.";
				break;
			case "NotAuthorizedException":
				errorMessage = "Incorrect email or password.";
				break;
			case "UserNotConfirmedException":
				errorMessage = "User not confirmed.";
				break;
			default:
				errorMessage = "Unexpected error. Please try again";
		}

		return {
			result: undefined,
			error: errorMessage,
			success: false,
		};
	}
}
