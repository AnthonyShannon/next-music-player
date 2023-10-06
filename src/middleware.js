import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    // If user is logged in there will be a token
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }


    return NextResponse.next()
}