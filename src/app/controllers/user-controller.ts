import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { createResult } from "@/src/utils/returnFunctions";

export const UserController = {
    deleteUser: async (params: { id: string }): Promise<ResultResponse<null>> => {
        try {
            if (!params.id) {
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            const result = await UserService.deleteUser(params.id);
            if (!result.success) {
                console.log("Failed to delete user in controller");
                return NextResponse.json(createResult(false, null, result.message), { status: 500 });
            }
            return NextResponse.json(createResult(true, null), { status: 200 });
        } catch (error) {
            console.error("Delete User Error:", error);
            return NextResponse.json(createResult(false, null, "Failed to delete user"), { status: 500 });
        }
    },
    getUser: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const userId = req.headers.get('x-user-id')
            if (!userId) {
                return NextResponse.json(createResult(false, null, "Yetkisiz işlem"), { status: 400 });
            }
            const result = await UserService.getUser(userId);
            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message), { status: 500 });
            }

            return NextResponse.json(createResult(true, result.data), { status: 200 });
        } catch (error) {
            console.error("Get User Error:", error);
            return NextResponse.json(createResult(false, null, "Kullanıcı bilgileri getirilirken bir hata oluştu"), { status: 500 });
        }
    },
}
