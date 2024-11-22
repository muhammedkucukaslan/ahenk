import { IAuthService } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";
import { generateToken } from "../utils/token";

export const AuthService: IAuthService = {
    generateToken: async (id : string, role: string): Promise<Result<string|null>> => {
        try {
            const token = await generateToken(id, role);
            
            if (!token) {
                return createResult(false, null, "Failed to generate token")
            }
            
            return createResult(true, token);
        } catch (error) {
            console.error("Generate Token Error:", error);
            return createResult(false, null, "Failed to generate token");
        }
    }
}
