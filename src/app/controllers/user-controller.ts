import { UserService } from "@/src/features/users/server/service";
import { NextRequest, NextResponse } from "next/server";
import { handleErrorResponse, handleSuccessResponse } from "@/src/utils/returnFunctions";

export const UserController = {
    getCurrentUser: async (req: NextRequest): IResponse<IUserProfile> => {
        try {
            const userId = req.headers.get('x-user-id')
            if (!userId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const result = await UserService.getCurrentUser(userId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }

            return handleSuccessResponse(result.data, 200);
        } catch (error) {
            console.error("Get User Error:", error);
            return handleErrorResponse("SERVER_ERROR", "Kullanıcı bilgileri getirilirken bir hata oluştu");
        }
    },
    getUserByUsername: async (req: NextRequest, username: string): IResponse<ILimitedUserProfile> => {
        try {
            const userId = req.headers.get('x-user-id')
            if (userId) {
                const result = await UserService.getCurrentUser(userId);
                if (!result.success) {
                    return handleErrorResponse(result.ERR_CODE, result.message);
                }
                if (result.data.username === username) {
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Ortam değişkenini veya localhost'u kullan
                    return NextResponse.redirect(`${baseUrl}/api/users/me`, 302);
                }
            }
            const result = await UserService.getUserByUsername(username);
            if (!result.success) {
                if (result.ERR_CODE === "NOT_FOUND") {
                    return handleErrorResponse(result.ERR_CODE, "Kullanıcı bulunamadı");
                }
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(result.data, 200);
        } catch (error) {
            console.error("Get User By Name Error:", error);
            return handleErrorResponse("SERVER_ERROR", "Kullanıcı bilgileri getirilirken bir hata oluştu");
        }
    },
    deleteUser: async (params: { id: string }): Promise<ApiResponse<null> | ApiError> => {
        try {
            const result = await UserService.deleteUser(params.id);
            if (!result.success) {
                if (result.ERR_CODE === "NOT_FOUND") {
                    return handleErrorResponse(result.ERR_CODE, "Kullanıcı bulunamadı");
                }
                return handleErrorResponse(result.ERR_CODE!, result.message!);
            }
            return NextResponse.json(null, { status: 200 });
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Kullanıcı silinirken bir hata oluştu");
        }
    },
}
