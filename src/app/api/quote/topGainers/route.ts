import { ApiResponse } from "@/types/ApiResponse.type";
import { TopMarketMoversTickerData } from "@/types/Stock.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest
): Promise<NextResponse<ApiResponse<TopMarketMoversTickerData[]>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/top-gainers`);

		const data: { success: boolean; data: TopMarketMoversTickerData[] } =
			await response.json();

		return NextResponse.json<ApiResponse<TopMarketMoversTickerData[]>>({
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
