import {
	getCurrentUser,
	signIn,
	SignInOutput,
	signOut,
} from "aws-amplify/auth";

export async function loginUser(
	email: string,
	password: string
): Promise<{
	result: SignInOutput | null;
	error: string;
	success: boolean;
}> {
	try {
		//clear stale user sessions
		try {
			await getCurrentUser(); // throws if none
			await signOut(); // clears stale/expired session
		} catch {
			// no user signed in, safe to continue
		}

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
		let errorMessage = "Unexpected error. Please try again";

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
			result: null,
			error: errorMessage,
			success: false,
		};
	}
}
