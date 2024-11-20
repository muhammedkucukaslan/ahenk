import { NextRequest,NextResponse} from "next/server";
import { UserController } from "@/src/app/controllers/user-controller";
import { cookies } from 'next/headers'
import { verifyToken } from "@/src/features/auth/utils/token";


export async function GET(req: NextRequest) {
    try {
        const token = (await cookies()).get('token')?.value
        console.log(token)
        if (!token) {
            return  NextResponse.redirect(new URL('/login', req.url))
        }
        const user = await verifyToken(token)
        return NextResponse.json(user)
    } catch (error) {
        
    }

}
