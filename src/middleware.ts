import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/';
    const isAdminPath = path.startsWith('/admin-dashboard');
    const isAdminLogin = path === '/admin/login';
    
    const token = request.cookies.get('token')?.value || '';
    const adminToken = request.cookies.get('admin-token')?.value || '';

    // Handle admin routes
    if (isAdminPath && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    if (isAdminLogin && adminToken) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.nextUrl));
    }

    // Handle regular user routes
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token && !isAdminLogin && !isAdminPath) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }
}


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