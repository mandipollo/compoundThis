import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//TODO: secure the cookie setup
const protectedRoutes = ["/user"];
const publicRoutes = ["/login", "/signup", "/"];

export async function middleware(req: NextRequest) {
	// test

	// if (req.nextUrl.pathname === "/user") {
	// 	return NextResponse.redirect(new URL("/", req.nextUrl));
	// }
	// Check if the user is logged in
	const userId = req.cookies.get("userId")?.value;
	console.log(userId);
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route =>
		path.startsWith(route)
	);
	const isPublicRoute = publicRoutes.includes(path);
	// 3. Decrypt the session from the cookie
	// 4. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !userId) {
		return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
	}
	// 5. Redirect to /dashboard if the user is authenticated
	if (isPublicRoute && userId && !req.nextUrl.pathname.startsWith("/user")) {
		return NextResponse.redirect(new URL("/user", req.nextUrl));
	}
	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
