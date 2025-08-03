"use server";

import { CognitoJwtVerifier } from "aws-jwt-verify";

const userPoolId = String(process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID);
const clientId = String(
	process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID
);

//FIXME:DEFINE A PREDICTABLE FUNCTION RESPONSE TYPE
export async function verifyJWT(
	token: string | undefined
): Promise<{ payload: any; success: boolean; message: string; error: string }> {
	try {
		if (!token) {
			return {
				payload: "",
				success: false,
				error: "idToken missing!",
				message: "",
			};
		}
		const verifier = CognitoJwtVerifier.create({
			userPoolId,
			tokenUse: "id",
			clientId,
		});

		const payload = await verifier.verify(token);

		return { payload, success: true, message: "Token verified", error: "" };
	} catch (error: any) {
		return {
			payload: "",
			success: false,
			error: error,
			message: "",
		};
	}
}
