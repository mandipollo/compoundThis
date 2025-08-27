"use server";

import { ApiResponse } from "@/types/ApiResponse.type";
import { DailyTickerSummary, FundamentalData } from "@/types/Stock.type";
import { NextRequest, NextResponse } from "next/server";

//
export async function GET(
	request: NextRequest
): Promise<NextResponse<ApiResponse<DailyTickerSummary>>> {
	try {
		const server = process.env.LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: "Server error",
				},
				{ status: 400 }
			);
		}

		const { searchParams } = new URL(request.url);
		const ticker = searchParams.get("ticker");

		if (!ticker) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: "Ticker is required",
				},
				{ status: 400 }
			);
		}
		const response = await fetch(
			`${server}/quote/daily-summary?ticker=${ticker}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		// check for invalid ticker
		if (!response.ok) {
			const errorData = await response.json();
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
			return NextResponse.json<ApiResponse<never>>({
				success: false,
				...data,
			});
		}

		return NextResponse.json<ApiResponse<DailyTickerSummary>>({
			success: true,
			data: data.data,
		});
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Unexpected server error";

		return NextResponse.json<ApiResponse<never>>(
			{
				success: false,
				error: message,
			},
			{ status: 500 }
		);
	}
}
