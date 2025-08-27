"use server";
import { ApiResponse } from "@/types/ApiResponse.type";
import { StatementData } from "@/types/Stock.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest
): Promise<NextResponse<ApiResponse<StatementData>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const { searchParams } = new URL(req.url);
		const ticker = searchParams.get("ticker");

		if (!ticker || typeof ticker !== "string") {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Ticker is required and must be string" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/statement?ticker=${ticker}`, {
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

		const data: StatementData = await response.json();
		return NextResponse.json<ApiResponse<StatementData>>({
			success: true,
			data,
		});
	} catch (error) {
		return NextResponse.json<ApiResponse<never>>({
			success: false,
			error: "error",
		});
	}
}
