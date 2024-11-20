import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './features/auth/utils/token';

const Auth_Pages = ['/login', '/signup'];

const isAuthPage = (pathname: any) => Auth_Pages.some(page => page.startsWith(pathname));


export async function middleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get('token') || { value: null };
    const hasVerifiedToken = token && await verifyToken(token);
    const isAuthPageRequest = isAuthPage(nextUrl.pathname);

    if (isAuthPageRequest) {
        if (!hasVerifiedToken) {
            return NextResponse.next()
        }
        const response = NextResponse.redirect(new URL('/panel', url))
        return response
    }

    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.pathname)
        searchParams.set("next", nextUrl.pathname)
        const response = NextResponse.redirect(new URL(`/login?${searchParams}`, url))
        response.cookies.delete("token");
        return response
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/signup', '/login', '/dashboard/:path*'],
}
