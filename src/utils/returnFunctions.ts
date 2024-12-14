import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'
import slugify from 'slugify'

async function validateData<T>(data: T, schema: yup.ObjectSchema<any>): Promise<T | null> {
    try {
        await schema.validate(data, { abortEarly: false });
        return data
    } catch (error) {
        console.error('error', error)
        return null;
    }
};

async function verifyToken(token: string) {
    try {
        const payload = await jwtVerify(token, getJWTSecretKey())
        return payload
    } catch (error) {
        console.error('error', error)
        return null
    }
}

function createSuccessResult<T>(data: T): SuccessResult<T> {
    return { success: true, data }
}

function createErrorResult<T>(message: string, ERR_CODE: string): ErrorResult {
    return { success: false, message, ERR_CODE }
}

const getJWTSecretKey = () => {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined")
    }
    return new TextEncoder().encode(secretKey)
}

async function getUserFromCookies(req: NextRequest): Promise<IResult<{ id: string, role: string }>> {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return createErrorResult("Token not provided", "TOKEN_NOT_PROVIDED")
    }
    try {
        const { payload } = await jwtVerify(token, getJWTSecretKey());
        if (!payload) {
            return createErrorResult("Invalid token", "INVALID_TOKEN")
        }
        return createSuccessResult({ id: payload.id as string, role: payload.role as string });
    } catch (error) {
        console.error("Error:", error);
        return createErrorResult("Invalid   token", "INVALID_TOKEN")
    }
}

const statusCodeMap: Record<string, number> = {
    "SERVER_ERROR": 500,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "USER_NOT_FOUND": 404,
    "METHOD_NOT_ALLOWED": 405,
    "UNSUPPORTED_MEDIA_TYPE": 415,
    "TIMEOUT": 408,
    "RATE_LIMIT_EXCEEDED": 429,
    "SERVICE_UNAVAILABLE": 503,
    "MISSING_REQUIRED_FIELD": 422,
    "INVALID_CREDENTIALS": 401,
    "SESSION_EXPIRED": 440,
    "PASSWORD_TOO_WEAK": 400,
    "DB_CONNECTION_ERROR": 500,
    "FILE_TOO_LARGE": 413,
    "INTERNAL_ERROR": 500,
    "INVALID_TOKEN": 401,
    "TOKEN_NOT_PROVIDED": 401
};

function createApiError(message: string, ERR_CODE?: string) {
    return { message, ERR_CODE }
};

function createApiResponse<T>(data: T | null = null) {
    return data
}


const handleErrorResponse = (errCode: string, message: string): ApiError => {
    const statusCode = statusCodeMap[errCode] || 500;

    console.error("Error:", errCode, message);
    return NextResponse.json(createApiError(message, errCode), { status: statusCode });
};


function handleSuccessResponse<T>(data: T, code: number = 200): ApiResponse<T> {
    return NextResponse.json(createApiResponse<T>(data), { status: code });
}


function makeItUrl(text: string): string {
    return slugify(text, {
        lower: true,                
        strict: true,               
        remove: /[^a-zA-Z0-9 _]/g,  
        replacement: '_'            
    });
};


const Auth_Pages = ['/login', '/signup'];
const isAuthPage = (pathname: string) => Auth_Pages.some(page => pathname.startsWith(page));


export {
    handleSuccessResponse,
    handleErrorResponse,
    getJWTSecretKey,
    createSuccessResult,
    createErrorResult,
    getUserFromCookies,
    isAuthPage,
    verifyToken,
    validateData,
    makeItUrl
};
