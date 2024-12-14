import { UserRepository } from "./repository";
import { IUserService } from "./interfaces";
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions";
import { hashPassword, comparePassword } from "../utils/bcrypt";


export const UserService: IUserService = {
    createUser: async (data): Promise<IResult<{ id: string, role: string }>> => {
        try {
            const isUsernameValid = await UserRepository.isUsernameValid(data.username);
            if (!isUsernameValid.success) {
                return createErrorResult(isUsernameValid.message, isUsernameValid.ERR_CODE);
            }
            const isEmailValid = await UserRepository.isEmailValid(data.email);
            if (!isEmailValid.success) {
                return createErrorResult(isEmailValid.message, isEmailValid.ERR_CODE);
            }
            const hashedPassword = await hashPassword(data.password);
            const creationResult = await UserRepository.createUser(
                {
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                }
            );
            if (!creationResult.success) {
                return createErrorResult(creationResult.message, creationResult.ERR_CODE);
            }
            return createSuccessResult(creationResult.data);
        } catch (error) {
            console.error("Create User Error:", error);
            return createErrorResult("Kullanıcı oluşturulurken bir hata oluştu", "SERVER_ERROR");
        }
    },
    deleteUser: async (id: string): Promise<IResult> => {
        try {
            const result = await UserRepository.deleteUser(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Delete User Error:", error);
            return createErrorResult("Kullanıcı silinirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    getCurrentUser: async (id: string): Promise<IResult<IUserProfile>> => {
        try {
            const result = await UserRepository.getCurrent(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createErrorResult("Kullanıcı bilgileri getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    getUserByUsername: async (name: string): Promise<IResult<ILimitedUserProfile>> => {
        try {
            const result = await UserRepository.getUserByUsername(name);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            console.error("Get User By Username Error:", error);
            return createErrorResult("Kullanıcı bilgileri getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    checkUserPasswordAndGetTokenInfos: async (data): Promise<IResult<{id: string; role: string}>> => {
        try {
            const result = await UserRepository.getUserPasswordAndTokenInfos(data.email);
            if (!result.success) {
                console.log(result.message);
                return createErrorResult(result.message, result.ERR_CODE);
            }
            const isPasswordCorrect = await comparePassword(data.password, result.data.password);

            if (!isPasswordCorrect) {
                console.log("Şifre hatalı");
                return createErrorResult("E-posta veya şifre hatalı", "INVALID_CREDENTIALS");
            }
            return createSuccessResult({ id: result.data.id, role: result.data.role });
        } catch (error) {
            console.error("Check Password Error:", error);
            return createErrorResult("Giriş işlemi sırasında hata oluştu", "SERVER_ERROR");
        }
    },
    // updateUserName: async (id: string, name: string): Promise<Result<null>> => {
    //     try {
    //         const result = await UserRepository.updateUserName(id, name)
    //         if (!result.success) {
    //             return createResult(false, null, result.message)
    //         }
    //         return createResult(true, null)
    //     } catch (error) {
    //         console.log("Update Username Error", error)
    //         return createResult(false, null, "Kullanıcı adı güncellenirken bir hata oluştu")
    //     }
    // },
    // updateUserEmail: async (id: string, email: string): Promise<Result<null>> => {
    //     try {
    //         const result = await UserRepository.updateUserEmail(id, email)
    //         if (!result.success) {
    //             return createResult(false, null, result.message)
    //         }
    //         return createResult(true, null)
    //     } catch (error) {
    //         console.log("Update Username Error", error)
    //         return createResult(false, null, "Kullanıcı e-postası güncellenirken bir hata oluştu")
    //     }
    // },

}

