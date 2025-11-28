import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/jwt-verifier";
import { fetchAuthSession } from "aws-amplify/auth";

// 1. Specify protected and public routes
const protectedRoutes = [
	"/dashboard",
	"/portfolio",
	"/activity",
	"/mail",
	"/setting",
	"/search",
];
const publicRoutes = [
	"/login",
	"/signup",
	"/",
	"/confirmEmail",
	"/forgotPassword",
	"/newPassword",
];

export async function middleware(request: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = request.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route =>
		path.startsWith(route)
	);
	const isPublicRoute = publicRoutes.includes(path);
	// 3. Verfiy the id token by calling util jwt-verify
	const idToken = request.cookies?.get("idToken");
	const idTokenValue = idToken?.value;
	const { success, payload, error, message } = await verifyJWT(idTokenValue);
	console.log(error);

	// 4. Fetchauthsession refreshes the access token if its expired
	if (success === false && error === "Error") {
		const session = await fetchAuthSession({ forceRefresh: true });
		console.log(session);
	}
	// 5 . Redirect to /login if the user is unauthenticated
	if (!idTokenValue && isProtectedRoute) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
	// 6. Redirect to /dashbaord if the user is authenticated
	if (success && isPublicRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
	}
	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
