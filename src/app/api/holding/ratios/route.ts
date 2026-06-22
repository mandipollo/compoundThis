"use server";
import { ApiResponse } from "@/types/ApiResponse.type";
import { Ratios } from "@/types/Ratios.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
): Promise<NextResponse<ApiResponse<Ratios>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 },
			);
		}
		const { searchParams } = new URL(req.url);
		const ticker = searchParams.get("ticker");
		if (!ticker || typeof ticker !== "string") {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Ticker is required" },
				{ status: 400 },
			);
		}
		const response = await fetch(`${server}/holding/ratios?ticker=${ticker}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: response.statusText,
				},
				{ status: response.status },
			);
		}
		const data: { success: boolean; data: Ratios } = await response.json();
		return NextResponse.json<ApiResponse<Ratios>>({
			success: true,
			data: data.data,
		});
	} catch (error: unknown) {
		// Catch unexpected runtime errors
		const message =
			error instanceof Error ? error.message : "Unexpected server error";
		return NextResponse.json<ApiResponse<never>>(
			{ success: false, error: message },
			{ status: 500 },
		);
	}
}
