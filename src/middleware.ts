import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/jwt-verifier";

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
	const { success, payload } = await verifyJWT(idTokenValue);
	console.log(payload?.sub ?? undefined);
	console.log("middleware running", idTokenValue);

	// 4 . Redirect to /login if the user is unauthenticated
	if (!idTokenValue && isProtectedRoute) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	// 5. Redirect to /dashbaord if the user is authenticated
	if (success && isPublicRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
	}
	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// // Routes Middleware should run on
// export const config = {
// 	matcher: [
// 		"/dashboard/:path*",
// 		"/portfolio/:path*",
// 		"/activity/:path*",
// 		"/mail/:path*",
// 		"/search/:path*",
// 		"/setting/:path*",
// 	],
// };
