import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from 'next/server'

async function verifyToken(token: string) {

    try {
        const payload = await jwtVerify(token, getJWTSecretKey())
        return payload
    } catch (error) {
        console.error('error', error)
        return null
    }
}



const getJWTSecretKey = () => {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined")
    }
    return new TextEncoder().encode(secretKey)
}

function redirectToLogin(req: NextRequest, message: string) {
    const { url, nextUrl } = req;
    const searchParams = new URLSearchParams(nextUrl.pathname);
    searchParams.set("next", nextUrl.pathname);
    const response = NextResponse.redirect(new URL(`/login?${searchParams}`, url));
    response.cookies.delete("token");
    return createResult(false, response, message);
}
async function getUserFromCookies(req: NextRequest): Promise<Result<null | { id: string, role: string }>> {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return createResult(false, null)
    }
    try {
        const { payload } = await jwtVerify(token, getJWTSecretKey());
        if (!payload) {
            return createResult(false, null)
        }
        return createResult(true, { id: payload.id as string, role: payload.role as string });
    } catch (error) {
        return createResult(false, null)
    }
}

function createResult<T>(success: boolean, data: T | null = null, message?: string): Result<T> {
    return { success, data, message };
}

const Auth_Pages = ['/login', '/signup'];
const isAuthPage = (pathname: string) => Auth_Pages.some(page => pathname.startsWith(page));


export {
    createResult,
    getUserFromCookies,
    redirectToLogin,
    getJWTSecretKey,
    isAuthPage,
    verifyToken
};
