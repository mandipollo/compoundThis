// libs/amplify/signupUser.ts
import { signUp } from "aws-amplify/auth";

export async function signUpUser(
	name: string,
	email: string,
	password: string
) {
	try {
		const result = await signUp({
			username: email,
			password,
			options: {
				userAttributes: {
					email,
					name,
				},
				autoSignIn: true,
			},
		});

		return { success: true, result, error: "" };
	} catch (error: any) {
		let errorMessage = "Something went wrong. Please try again.";
		switch (error.name) {
			case "UsernameExistsException":
				errorMessage = "Username is already taken";
				break;
			case "LimitExceededException":
				errorMessage = "Too many attempts. Please try again later";
				break;
			case "InvalidPasswordException":
				errorMessage = "Password does not meet requirements";
				break;
			default:
				errorMessage = "Unexpected error. Please try again";
		}

		return { success: false, error: errorMessage, result: null };
	}
}
