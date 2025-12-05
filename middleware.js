import { NextResponse } from "next/server";

export function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value;
    const { pathname } = request.nextUrl;

    const country = request.geo?.country || "Unknown";
    const region = request.geo?.region || "Unknown";

    const response = NextResponse.next();
    response.cookies.set("userCountry", country, { path: "/" });
    response.cookies.set("userRegion", region, { path: "/" });

    if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/forgot-password") || pathname.startsWith('/reset-password') || pathname.startsWith('/verify-otp')) {
        return response;
    }

    if (!authToken) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"
    ],
};
