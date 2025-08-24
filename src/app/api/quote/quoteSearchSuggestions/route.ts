"use server";

import { NextRequest, NextResponse } from "next/server";

//
export async function GET(request: NextRequest) {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json(
				{ success: false, error: "Server error" },
				{ status: 500 }
			);
		}

		const { searchParams } = new URL(request.url);
		const ticker = searchParams.get("ticker");

		if (!ticker) {
			return NextResponse.json(
				{ success: false, error: "Ticker required" },
				{ status: 500 }
			);
		}
		const response = await fetch(
			`${server}/finance-quote/suggestions?ticker=${ticker}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			return NextResponse.json(
				{ success: false, error: response.statusText },
				{ status: response.status }
			);
		}

		const data = await response.json();

		//  Check if the external API's own success flag is false
		if (data.success === false) {
			return NextResponse.json(
				{
					success: false,
					error: data.error || "Unknown backend error",
				},
				{ status: 502 }
			);
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error: unknown) {
		// Catch unexpected runtime errors
		const message =
			error instanceof Error ? error.message : "Unexpected server error";
		return NextResponse.json(
			{ success: false, error: message },
			{ status: 500 }
		);
	}
}
