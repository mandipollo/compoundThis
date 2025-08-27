import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/jwt-verifier";

export async function middleware(request: NextRequest) {
	// routes
	const protectedRoutes = ["/user"];
	const publicRoutes = ["/login", "/signup", "/"];

	const path = request.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.some(route =>
		path.startsWith(route)
	);
	const isPublicRoute = publicRoutes.includes(path);

	// retrieve idToken
	const idToken = request.cookies?.get("idToken");
	const idTokenValue = idToken?.value;

	//
	if (!idTokenValue && isProtectedRoute) {
		return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
	}

	// verify id token is valid by calling util function jwt-verify
	const { success } = await verifyJWT(idTokenValue);

	console.log("middleware running");
	if (success && isPublicRoute) {
		return NextResponse.redirect(new URL("/user", request.nextUrl));
	}
	return NextResponse.next();
}

// Routes Middleware should run on
export const config = {
	matcher: [
		"/user/:path*",
		"/auth/login",
		"/auth/signup",
		"/auth/confirmEmail",
		"/auth/forgotPassword",
		"/auth/newPassword",
		"/",
	], // match both protected & public
};
