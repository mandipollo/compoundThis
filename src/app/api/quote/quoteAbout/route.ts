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
	if (!ticker) {
		return NextResponse.json({ success: false, error: "Ticker is required" });
	}

	const response = await fetch(
		`${server}/finance-quote/about?ticker=${ticker}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	);
	if (!response.ok) {
		const errorData = await response.json();
		return NextResponse.json({
			success: false,
			...errorData,
		});
	}

	const data = await response.json();
	//  Check if the external API's own success flag is false
	if (data.success === false) {
		return NextResponse.json({
			success: false,
			...data,
		});
	}

	return NextResponse.json({ success: true, data: data.data });
}
