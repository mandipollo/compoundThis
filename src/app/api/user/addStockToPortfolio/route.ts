import ApiError from "@/utils/ApiError";
import { verifyJWT } from "@/utils/jwt-verifier";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const server = process.env.NEXT_PUBLIC_LOCAL_BASE_SERVER;
		if (!server) {
			return NextResponse.json(
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
			return NextResponse.json(
				{
					success: false,
					error: error,
				},
				{ status: 401 }
			);
		}

		const { sub } = payload;

		const body = await req.json();

		const response = await fetch(`${server}/user/addStockToPortfolio`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${sub}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new ApiError("Internal server error", 401);
		}

		const data = await response.json();

		return NextResponse.json(
			{ success: true, data: data.data },
			{ status: 200 }
		);
	} catch (error: unknown) {
		if (error instanceof ApiError) {
			return NextResponse.json(
				{ success: false, error: error.message },
				{ status: error.statusCode }
			);
		}
		return NextResponse.json({
			success: false,
			error: "Unexpected error. Please try again",
		});
	}
}
