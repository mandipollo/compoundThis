"use server";

import { ApiResponse } from "@/types/ApiResponse.type";
import { AboutData } from "@/types/Stock.type";
import { NextRequest, NextResponse } from "next/server";

//
export async function GET(
	request: NextRequest
): Promise<NextResponse<ApiResponse<AboutData>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const { searchParams } = new URL(request.url);
		const ticker = searchParams.get("ticker");
		if (!ticker || typeof ticker !== "string") {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Ticker is required" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/about?ticker=${ticker}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: response.statusText,
				},
				{ status: response.status }
			);
		}

		const data = await response.json();
		//  Check if the external API's own success flag is false
		if (!data.success) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: data.error,
				},
				{ status: 502 }
			);
		}

		return NextResponse.json<ApiResponse<AboutData>>(
			{
				success: true,
				data: data.data,
			},
			{ status: 200 }
		);
	} catch (error) {
		// Catch unexpected runtime errors
		const message =
			error instanceof Error ? error.message : "Unexpected server error";
		return NextResponse.json<ApiResponse<never>>(
			{ success: false, error: message },
			{ status: 500 }
		);
	}
}
