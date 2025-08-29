import { ApiResponse } from "@/types/ApiResponse.type";
import { MarketStatusData } from "@/types/Stock.type";
import { NextResponse } from "next/server";

export async function GET(): Promise<
	NextResponse<ApiResponse<MarketStatusData>>
> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${server}/quote/market-status`, {
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

		return NextResponse.json<ApiResponse<MarketStatusData>>(
			{ success: true, data: data.data },
			{ status: 200 }
		);
	} catch (error: unknown) {
		return NextResponse.json<ApiResponse<never>>(
			{
				success: false,
				error: "Unexpected error. Please try again",
			},
			{ status: 500 }
		);
	}
}
