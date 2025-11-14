import { NextResponse } from "next/server";

export async function GET() {
	try {
		const fxApiKey = process.env.NEXT_PUBLIC_FXRATE_API;

		const response = await fetch(
			"https://api.fxratesapi.com/latest?base=USD&currencies=GBP&resolution=1m&amount=1&places=6&format=json",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${fxApiKey}`,
				},
			}
		);
		const data = await response.json();
		return NextResponse.json({ success: true, rate: data.rates.GBP });
	} catch (err: unknown) {
		if (err instanceof Error) {
			return NextResponse.json(
				{ success: false, error: err.message },
				{ status: 404 }
			);
		}
		return NextResponse.json({
			success: false,
			error: "Failed to fetch fxrate",
		});
	}
}
