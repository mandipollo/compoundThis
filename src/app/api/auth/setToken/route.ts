"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//FIXME: SET SECURE TO TRUE ON PRODUCTION
// NEED TO WORK ON REFRESH TOKEN AS CURRENTLY THE TOKEN EXPIRATION IS MISMATCHED IN CLIENT AND SERVER
export async function POST(request: NextRequest) {
	const { idToken, tokenExp } = await request.json();
	// Decode without verifying to get expiry (safe if token is already verified)

	(await cookies()).set("idToken", idToken, {
		httpOnly: true,
		secure: false,
		path: "/",
		sameSite: "strict",
		maxAge: tokenExp,
	});

	return NextResponse.json({ success: true });
}
