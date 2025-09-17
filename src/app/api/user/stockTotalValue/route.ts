import { verifyJWT } from "@/utils/jwt-verifier";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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

		const response = await fetch(`${server}/user/getUserStockTotalValue`, {
			method: "GET",
			headers: { Authorization: `Bearer ${sub}` },
		});

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
		return NextResponse.json({ success: true, data: data.data });
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
