import { auth } from "@/src/app/useCases/auth";
import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { createResult } from "@/src/utils/returnFunction";
import { registerSchema } from "@/src/features/users/validation";


export const UserController = {
    deleteUser: async (params: { id: string }): Promise<ResultResponse<null>> => {
        try {
            if (!params.id) {
                console.log("Invalid data in controller");
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            const result = await UserService.deleteUser(params.id);
            if (!result.success) {
                console.log("Failed to delete user in controller");
                return NextResponse.json(createResult(false, null, "Failed to delete user"), { status: 500 });
            }
            return NextResponse.json(createResult(true, null), { status: 200 });
        } catch (error) {
            console.error("Delete User Error:", error);
            return NextResponse.json(createResult(false, null, "Failed to delete user"), { status: 500 });
        }
    }
}
