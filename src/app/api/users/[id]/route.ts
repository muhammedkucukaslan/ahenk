import { UserController } from "@/src/app/controllers/user-controller";
import { NextRequest } from "next/server";
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return await UserController.deleteUser(params);
}   