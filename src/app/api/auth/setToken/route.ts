"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//FIXME: SET SECURE TO TRUE ON PRODUCTION
export async function POST(request: NextRequest) {
	const { idToken } = await request.json();

	(await cookies()).set("idToken", idToken, {
		httpOnly: true,
		secure: false,
		path: "/",
		sameSite: "strict",
		maxAge: 3600, // 1 hour
	});

	return NextResponse.json({ success: true });
}
