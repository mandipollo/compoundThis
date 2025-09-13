import { verifyJWT } from "@/utils/jwt-verifier";
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

		const body = await req.json();
		const { idToken } = body;

		// verify idToken
		const { payload, success, error } = await verifyJWT(idToken);

		if (!success) {
			return NextResponse.json(
				{ success: false, error: error },
				{ status: 400 }
			);
		}

		const { sub, email, name } = payload;

		//
		const response = await fetch(`${server}/user/signup`, {
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
		return NextResponse.json(
			{
				success: false,
				error: "Unexpected error. Please try again",
			},
			{ status: 500 }
		);
	}
}
