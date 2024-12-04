import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies, redirectToLogin, isAuthPage } from '@/src/utils/returnFunctions';


export async function middleware(request: NextRequest) {
    const { url, nextUrl } = request;
    const {success,data} = await getUserFromCookies(request);
    const isAuthPageRequest = isAuthPage(nextUrl.pathname);
    if (isAuthPageRequest) {
        if (!success) {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
        const response = NextResponse.redirect(new URL('/', url));
        return response;
    }

    if (nextUrl.pathname.startsWith('/api/login')|| nextUrl.pathname.startsWith('/api/signup'))  {
        return NextResponse.next();
    }


    if (!success || !data) {
        const redirectUrl = new URL('/login', url);
        redirectUrl.searchParams.set('next', nextUrl.pathname);
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete('token');
        return response;
    }
    
    const response = NextResponse.next();
    response.headers.set('x-user-id', data.id);
    response.headers.set('x-user-role', data.role);
    return response
}

export const config = {
    matcher: ['/signup', '/login','/api/:path*'],
};
