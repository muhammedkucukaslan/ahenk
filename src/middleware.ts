import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies, isAuthPage } from '@/src/utils/returnFunctions';


export async function middleware(request: NextRequest) {

    const { url, nextUrl } = request;
    const result = await getUserFromCookies(request);

    const isAuthPageRequest = isAuthPage(nextUrl.pathname);
    if (isAuthPageRequest) {
        if (!result.success) {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
        const response = NextResponse.redirect(new URL('/', url));
        return response;
    }

    if (nextUrl.pathname.startsWith('/api/login') || nextUrl.pathname.startsWith('/api/signup')) {
        return NextResponse.next();
    }

    if ((request.method === 'POST' || request.method === 'PATCH' || request.method === 'DELETE' || request.method === 'PUT') && nextUrl.pathname.startsWith('/api')) {
        if (!result.success) {
            const redirectUrl = new URL('/login', url);
            redirectUrl.searchParams.set('next', nextUrl.pathname);
            const response = NextResponse.redirect(redirectUrl);
            response.cookies.delete('token');
            return response;
        }
        const response = NextResponse.next();
        response.headers.set('x-user-id', result.data.id);
        response.headers.set('x-user-role', result.data?.role);
        return response
    }


    

    const response = NextResponse.next();
    if (result.success) {
        response.headers.set('x-user-id', result.data.id);
        response.headers.set('x-user-role', result.data.role);
    }
    return response
}

export const config = {
    matcher: ['/signup', '/login', '/dashboard/:path*', '/api/:path*'],
};
