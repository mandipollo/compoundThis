"use server";

// set user session cookies
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { userId } = await req.json();
	console.log(userId);
	if (!userId) {
		return new NextResponse("Missing token", { status: 400 });
	}

	//
	const cookieStore = await cookies();
	cookieStore.set("userId", userId);
	return new NextResponse("Cookie set", { status: 200 });
}
