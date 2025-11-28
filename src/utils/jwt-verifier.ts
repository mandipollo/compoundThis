"use server";

import { CognitoJwtVerifier } from "aws-jwt-verify";

const userPoolId = String(process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID);
const clientId = String(
	process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID
);

//FIXME:DEFINE A PREDICTABLE FUNCTION RESPONSE TYPE
export async function verifyJWT(idToken: string | undefined): Promise<{
	payload: any;
	success: boolean;
	message: string | null;
	error: string | null;
}> {
	try {
		if (!idToken) {
			return {
				payload: null,
				success: false,
				error: "IdToken missing!",
				message: null,
			};
		}
		const verifier = CognitoJwtVerifier.create({
			userPoolId,
			tokenUse: "id",
			clientId,
		});

		const payload = await verifier.verify(idToken);

		return { payload, success: true, message: "Token verified", error: null };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				error: error.name,
				message: null,
				payload: null,
				success: false,
			};
		}
		return {
			payload: null,
			success: false,
			error: "Invalid token",
			message: null,
		};
	}
}
