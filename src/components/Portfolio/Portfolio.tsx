"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const Portfolio = () => {
	const [res, setRes] = useState<string>("");
	const handleTest = async () => {
		const response = await fetch("/api/test", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		console.log(result);

		setRes(result);
	};

	return (
		<section className="flex flex-col w-full h-full items-center justify-center">
			<Button onClick={handleTest}>TEST</Button>
		</section>
	);
};

export default Portfolio;
