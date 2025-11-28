"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";

// Refreshes the token on first app load and every 60 min when the token expires
const AuthTokenRefresher = () => {
	const refreshToken = async () => {
		const sessions = await fetchAuthSession({ forceRefresh: true });

		const idToken = sessions.tokens?.idToken?.toString();
		const tokenExp = sessions.tokens?.idToken?.payload.exp;
		// set tokens in middleware
		await fetch("/api/auth/setToken", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ idToken, tokenExp }),
		});
	};
	useEffect(() => {
		refreshToken();
		const interval = setInterval(
			() => {
				refreshToken();
			},
			1000 * 60 * 5
		);
		() => {
			clearInterval(interval);
		};
	}, []);

	return null;
};

export default AuthTokenRefresher;
