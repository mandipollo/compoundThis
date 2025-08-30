import { ApiResponse } from "@/types/ApiResponse.type";
import { PopularTickerData } from "@/types/Stock.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest
): Promise<NextResponse<ApiResponse<PopularTickerData[]>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;

		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/popular-stocks`);

		if (!response.ok) {
			return NextResponse.json(
				{ success: false, error: response.statusText },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return NextResponse.json<ApiResponse<PopularTickerData[]>>({
			success: true,
			data: data,
		});
	} catch (error: unknown) {
		let message =
			error instanceof Error
				? error.message
				: "Unexpected error. Please try again";

		return NextResponse.json(
			{ success: false, error: message },
			{ status: 500 }
		);
	}
}
