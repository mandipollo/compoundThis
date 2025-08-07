import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

	if (!server) {
		return;
	}
	const response = await fetch(server, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	const result = await response.json();
	return NextResponse.json(result);
}
