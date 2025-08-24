"use server";

import { NextRequest, NextResponse } from "next/server";

//
export async function GET(request: NextRequest) {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const { searchParams } = new URL(request.url);
		const ticker = searchParams.get("ticker");
		if (!ticker) {
			return NextResponse.json(
				{ success: false, error: "Ticker is required" },
				{ status: 400 }
			);
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
	} catch (error) {
		// Catch unexpected runtime errors
		const message =
			error instanceof Error ? error.message : "Unexpected server error";
		return NextResponse.json(
			{ success: false, error: message },
			{ status: 500 }
		);
	}
}
