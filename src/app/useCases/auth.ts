import { UserService } from "@/src/features/users/server/service";
import { AuthService } from "@/src/features/auth/server/service";
import { registerSchema, loginSchema } from "@/src/features/users/validation";
import { InferType } from "yup";
import { createResult } from "@/src/utils/returnFunction";
export const auth = {
    signup: async (data: InferType<typeof registerSchema>): Promise<Result<{ token: string } | null>> => {
        try {
            const creationResult = await UserService.createUser(data);

            if (!creationResult.success || !creationResult.data) {
                return createResult(false, null, creationResult.message);
            }
            const tokenResult = await AuthService.generateToken(creationResult.data.id, creationResult.data.role);
            if (!tokenResult.success) {
                return createResult(false, null, tokenResult.message)
            }
            return createResult<{ token: string }>(true, { token: tokenResult.data! });
        } catch (error) {
            console.error("Create User Error:", error);
            return createResult(false, null, "Failed to create user");
        }
    },
    login: async (data: InferType<typeof loginSchema>): Promise<Result<{ token: string } | null>> => {
        try {
            const result = await UserService.checkUserPassword(data);
            if (!result.success || !result.data) {
                return createResult(false, null, result.message );
            }

            const tokenResult = await AuthService.generateToken(result.data.id, result.data.role);
            if (!tokenResult.success) {
                return createResult(false, null, tokenResult.message)
            }
            return createResult<{ token: string }>(true, { token: tokenResult.data! });

        } catch (error) {
            console.error("Create User Error:", error);
            return createResult(false, null, "Failed to create user");
        }
    }

}
