import { redirect } from "next/navigation";
import { resendSignUpCode } from "aws-amplify/auth";

// zod schema

export async function handleSendEmailVerificationCode(
	prevState: { message: string; errorMessage: string },
	formData: FormData
) {
	let currentState;
	try {
		await resendSignUpCode({ username: String(formData.get("email")) });
		currentState = {
			...prevState,
			message: "Code sent successfully",
		};
	} catch (error) {
		currentState = { ...prevState, errorMessage: error };
	}
	return currentState;
}
