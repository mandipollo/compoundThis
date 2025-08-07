"use client";

import React, { useState } from "react";
import { Label } from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const TestingComponent = () => {
	const [state, setState] = useState("");
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setPending(true);
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget);
			const ticker = formData.get("ticker") as string;

			const res = await fetch(`/api/stock/getStockData?ticker=${ticker}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setPending(false);
		}
	};
	return (
		<Card className="w-full max-w-sm bg-white border shadow-md py-4 rounded-md gap-2">
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<div className="grid gap-2">
							<Label>Ticker</Label>
							<Input
								name="ticker"
								id="ticker"
								type="text"
								placeholder="AAPL"
								required
							/>
						</div>

						<Button disabled={pending} type="submit" className="w-full">
							{pending ? "Retrieving data" : "Search"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default TestingComponent;
