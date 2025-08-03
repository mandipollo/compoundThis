import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(req: NextRequest) {
	const cookieStore = await cookies();
	cookieStore.delete("idToken");
	return NextResponse.json({ success: true });
}
