import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "aws-amplify/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
	// Check if the user is logged in

	const { username } = await getCurrentUser();

	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// 3. Decrypt the session from the cookie

	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !username) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	// 5. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		username &&
		!req.nextUrl.pathname.startsWith("/dashboard")
	) {
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
