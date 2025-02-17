import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/';
    const isAdminPath = path.startsWith('/admin-dashboard');
    const isAdminLogin = path === '/admin/login';
    
    // Get both authentication types
    const jwtToken = request.cookies.get('token')?.value || '';
    const session = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
    });
    const adminToken = request.cookies.get('admin-token')?.value || '';

    // User is authenticated if either token exists
    const isAuthenticated = !!jwtToken || !!session;
    
    // Handle admin routes
    if (isAdminPath && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    if (isAdminLogin && adminToken) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.nextUrl));
    }

    // Handle regular user routes
    if (isPublicPath && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if (!isPublicPath && !isAuthenticated && !isAdminLogin && !isAdminPath) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }
}

// Keep your existing config
export const config = {
    matcher: [
        '/',
        '/auth/login',
        '/auth/signup',
        '/profile',
        '/verifyemail',
        '/dashboard',
        '/my-reports',
        '/report-crime/:path*',
        '/evidence-page',
        '/resources/:path*',
        '/messages',
        '/admin-dashboard',
        '/admin-dashboard/:path*',
    ],
}
