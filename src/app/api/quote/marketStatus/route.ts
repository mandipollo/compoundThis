import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/market-status`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		const data = await response.json();
		return NextResponse.json({ success: true, data: data }, { status: 200 });
	} catch (error: unknown) {
		return NextResponse.json(
			{
				success: false,
				error: "Unexpected error. Please try again",
			},
			{ status: 500 }
		);
	}
}
