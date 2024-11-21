import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../../controllers/user-controller";


export async function GET(req: NextRequest) {
    try {
        return UserController.getUser(req)
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ "error": "Failed to get user" })
    }

}
