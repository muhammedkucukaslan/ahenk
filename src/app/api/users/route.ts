import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../../controllers/user-controller";


export async function GET(req: NextRequest) {
        return UserController.getUser(req)
}
