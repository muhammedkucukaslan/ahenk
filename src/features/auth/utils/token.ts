import { SignJWT } from "jose"
import { getJWTSecretKey } from "@/src/utils/returnFunctions"

export async function generateToken(id: string, role: string ) : Promise<string> {
    
    const payload = {id,role}
     const token = await new  SignJWT(payload)
     .setProtectedHeader({ alg: 'HS256' })
     .setIssuedAt()
     .setExpirationTime('2h')
     .sign(getJWTSecretKey());
    
     return token
}

