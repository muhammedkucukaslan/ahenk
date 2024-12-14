import { IAuthService } from "./interfaces";
import { generateToken } from "../utils/token";
import { createErrorResult, createSuccessResult} from "@/src/utils/returnFunctions";

export const AuthService: IAuthService = {
    generateToken: async (id : string, role: string): Promise<IResult<string>> => {
        try {
            const token = await generateToken(id, role);
            
            if (!token) {
                return createErrorResult("Token üretiminde hata oluştu", "SERVER_ERROR");
            }
            return createSuccessResult(token);
        } catch (error) {
            console.error("Generate Token Error:", error);
            return createErrorResult("Token üretiminde hata oluştu", "SERVER_ERROR")
        }
    }
}
