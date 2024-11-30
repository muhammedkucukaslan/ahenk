import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { createResult } from "@/src/utils/returnFunctions";
import { registerSchema } from "@/src/features/users/validation";
import { getUserFromCookies } from "@/src/utils/returnFunctions";
import { headers } from 'next/headers'

//example

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
    },
    getUser: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            if (req.body) {
                const body = await req.json();
                console.log("body", body)
              } else {
                console.log("Body is empty!");
              }
            const userId = req.headers.get('x-user-id')
            console.log("userId", userId)
            if (!userId) {
                console.log("Invalid data in controller");
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            const result = await UserService.getIUserBasicInfoById(userId);
            if (!result.success) {
                console.log("Failed to get user in controller");
                return NextResponse.json(createResult(false, null, "Failed to get user"), { status: 500 });
            }

            return NextResponse.json(createResult(true, result.data), { status: 200 });
        } catch (error) {
            console.error("Get User Error:", error);
            return NextResponse.json(createResult(false, null, "Failed to get user"), { status: 500 });
        }
    },
}
