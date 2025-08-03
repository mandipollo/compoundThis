import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const response = await fetch("http://localhost:8080/test", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	const result = await response.json();
	return NextResponse.json(result);
}
