import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from './lib/jwt'

export async function proxy(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const pathname = req.nextUrl.pathname

    // 1️⃣ Allow public routes
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        // Only redirect logged-in users if token is valid
        if (token) {
            try {
                verifyJwt(token) // throws if invalid
                return NextResponse.redirect(new URL('/dashboard', req.url))
            } catch {
                return NextResponse.next() // invalid token or logged out → show login/register
            }
        }
        return NextResponse.next()
    }

    // 2️⃣ Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            // ✅ Only redirect to login if token missing
            return NextResponse.redirect(new URL('/login', req.url))
        }

        try {
            const payload = verifyJwt(token)

            // Admin-only routes
            if (pathname.startsWith('/dashboard/admin') && payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            return NextResponse.next()
        } catch {
            // Invalid token → redirect to login
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    // 3️⃣ Allow all other routes
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
}
