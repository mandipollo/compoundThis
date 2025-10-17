"use server";

import { ApiResponse } from "@/types/ApiResponse.type";
import { SearchResultItem } from "@/types/Search.type";
import { NextRequest, NextResponse } from "next/server";

//
export async function GET(
	request: NextRequest
): Promise<NextResponse<ApiResponse<SearchResultItem[]>>> {
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

		if (!ticker || typeof ticker !== "string") {
			return NextResponse.json(
				{ success: false, error: "Ticker is required" },
				{ status: 500 }
			);
		}
		const response = await fetch(
			`${server}/holding/suggestion?ticker=${ticker}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		if (!response.ok) {
			throw new Error(`Status - ${response.status} `);
		}
		const data = await response.json();
		//  Check if the external API's own success flag is false
		if (data.success === "false") {
			return NextResponse.json(
				{
					success: false,
					error: response.statusText || "Unknown backend error",
				},
				{ status: 502 }
			);
		}
		return NextResponse.json<ApiResponse<SearchResultItem[]>>({
			success: true,
			data: data.data,
		});
	} catch (error: unknown) {
		// Catch unexpected runtime errors
		const message =
			error instanceof Error ? error.message : "Unexpected server error";
		return NextResponse.json<ApiResponse<never>>(
			{ success: false, error: message },
			{ status: 500 }
		);
	}
}
