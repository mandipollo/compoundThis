import ApiError from "@/utils/ApiError";
import { verifyJWT } from "@/utils/jwt-verifier";
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
		const authHeaders = req.headers.get("Authorization");
		if (!authHeaders) {
			throw new ApiError("Authorization headers missing", 401);
		}
		const parts = authHeaders.split(" ");
		if (parts[0] !== "Bearer" || parts.length !== 2) {
			throw new ApiError("Invalid Authorization header format", 401);
		}
		const cognitoId = parts[1];
		// verify idToken
		const { payload, success, error } = await verifyJWT(cognitoId);
		if (!success) {
			return NextResponse.json(
				{ success: false, error: error },
				{ status: 401 }
			);
		}
		const { sub, email, name } = payload;
		//
		const response = await fetch(`${server}/user/user`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cognitoId: sub, username: name, email }),
		});
		if (!response.ok) {
			return NextResponse.json(
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
		return NextResponse.json(
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
