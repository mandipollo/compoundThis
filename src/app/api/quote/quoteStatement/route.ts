"use server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

		if (!server) {
			return NextResponse.json(
				{ success: false, error: "Server error" },
				{ status: 500 }
			);
		}

		const { searchParams } = new URL(req.url);
		const ticker = searchParams.get("ticker");

		if (!ticker || typeof ticker !== "string") {
			return NextResponse.json(
				{ success: false, error: "Ticker is required and must be string" },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${server}/finance-quote/statement?ticker=${ticker}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{
					success: false,
					...errorData,
				},
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json({ success: true, data: data.data });
	} catch (error) {
		return NextResponse.json({ success: false, error: "error" });
	}
}
