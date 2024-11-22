import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookies, redirectToLogin, isAuthPage, verifyToken } from '@/src/utils/returnFunctions';
import next from 'next';


export async function middleware(request: NextRequest) {
    const { url, nextUrl } = request;
    const {success,data} = await getUserFromCookies(request);
    console.log("success", success);
    console.log("data", data);
    const isAuthPageRequest = isAuthPage(nextUrl.pathname);
    console.log("isAuthPageRequest", isAuthPageRequest);
    if (isAuthPageRequest) {
        if (!success) {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
        console.log("burasi calisti B")
        const response = NextResponse.redirect(new URL('/dashboard', url));
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
    response.headers.set('muhammed', "muhammed");
    response.headers.set('x-user-id', data.id);
    response.headers.set('x-user-role', data.role);
    return response
}

export const config = {
    matcher: ['/signup', '/login', '/dashboard/:path*','/api/:path*'],
};
