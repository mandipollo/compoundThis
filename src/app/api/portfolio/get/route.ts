import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/utils/jwt-verifier";
import { ApiResponse } from "@/types/ApiResponse.type";

import { UserStock } from "@/types/UserPortfolio.type";

export async function GET(): Promise<NextResponse<ApiResponse<UserStock[]>>> {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json<ApiResponse<never>>(
				{ success: false, error: "Server error" },
				{ status: 400 }
			);
		}

		// get idToken from cookie store  and check the validity of the idToken
		const cookieStore = await cookies();
		const idToken = cookieStore.get("idToken");
		const idTokenValue = idToken?.value;

		const { success, payload, error } = await verifyJWT(idTokenValue);

		if (!success) {
			return NextResponse.json<ApiResponse<never>>(
				{
					success: false,
					error: error || "Invalid token",
				},
				{ status: 401 }
			);
		}

		const { sub } = payload;

		const response = await fetch(`${server}/portfolio/portfolio`, {
			method: "GET",
			headers: { Authorization: `Bearer ${sub}` },
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
			return NextResponse.json(
				{
					success: false,
					error: data.error,
				},
				{ status: 502 }
			);
		}

		return NextResponse.json<ApiResponse<UserStock[]>>(
			{ success: true, data: data.data },
			{ status: 200 }
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json(
				{ success: false, error: error.message },
				{ status: 401 }
			);
		}
		return NextResponse.json(
			{
				success: false,
				error: "Unexpected error. Please try again",
			},
			{ status: 500 }
		);
	}
}
