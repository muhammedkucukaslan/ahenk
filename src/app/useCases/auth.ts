import { UserService } from "@/src/features/users/server/service";
import { AuthService } from "@/src/features/auth/server/service";
import { registerSchema, loginSchema } from "@/src/features/users/validation";
import { InferType } from "yup";
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions";
export const auth = {
    signup: async (data: InferType<typeof registerSchema>): Promise<IResult<string>> => {
        try {
            const creationResult = await UserService.createUser(data);

            if (!creationResult.success) {
                return createErrorResult(creationResult.message, creationResult.ERR_CODE);
            }

            const tokenResult = await AuthService.generateToken(creationResult.data.id, creationResult.data.role);

            if (!tokenResult.success) {
                return createErrorResult(tokenResult.message, tokenResult.ERR_CODE);
            }

            return createSuccessResult(tokenResult.data);
        } catch (error) {
            console.error("Signup Error:", error);
            return createErrorResult("Kayıt işleminde hata oluştu", "SERVER_ERROR");
        }
    },
    login: async (data: InferType<typeof loginSchema>): Promise<IResult<string>> => {
        try {
            const result = await UserService.checkUserPasswordAndGetTokenInfos(data);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }

            const tokenResult = await AuthService.generateToken(result.data.id, result.data.role);
            if (!tokenResult.success) {
                return createErrorResult(tokenResult.message, tokenResult.ERR_CODE);
            }
            return createSuccessResult(tokenResult.data);
        } catch (error) {
            console.error("Login Error:", error);
            return createErrorResult("Giriş işleminde hata oluştu", "SERVER_ERROR");
        }
    }

}
