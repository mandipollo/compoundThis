"use server";

import { NextRequest, NextResponse } from "next/server";

//
export async function GET(request: NextRequest) {
	const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
	if (!server) {
		return NextResponse.json({ success: false, error: "Server error" });
	}

	const { searchParams } = new URL(request.url);
	const ticker = searchParams.get("ticker");
	const response = await fetch(
		`${server}/finance-quote/suggestions?ticker=${ticker}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	);

	const data = await response.json();
	return NextResponse.json({ success: true, data });
}
