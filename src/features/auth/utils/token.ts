import { jwtVerify ,SignJWT } from "jose"

export const getJWTSecretKey = () => {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined")
    }
    return new TextEncoder().encode(secretKey)
}

export async function verifyToken(token : string)  {

    try {
        const payload = await jwtVerify(token, getJWTSecretKey())
        return payload 
    } catch (error) {
        console.error('error', error)
        return null
    }
}


export async function generateToken(id: string, role: string ) : Promise<string> {
    
    const payload = {id,role}
     const token = await new  SignJWT(payload)
     .setProtectedHeader({ alg: 'HS256' })
     .setIssuedAt()
     .setExpirationTime('2h')
     .sign(getJWTSecretKey());
    
     return token
}

