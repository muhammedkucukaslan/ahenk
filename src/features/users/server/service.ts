import { UserRepository } from "./repository";
import { IUserService } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";
import { hashPassword, comparePassword } from "../utils/bcrypt";


export const UserService: IUserService = {
    createUser: async (data): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const hashedPassword = await hashPassword(data.password);
            const creationResult = await UserRepository.createUser(
                {
                    password: hashedPassword,
                    email: data.email,
                    name: data.name,
                    surname : data.surname
                }
            );
            if (!creationResult.success) {
                return createResult<null>(false, null, creationResult.message);
            }
            return createResult<IUserBasicInfo>(true, creationResult.data);
        } catch (error) {
            console.error("Create User Error:", error);
            return createResult<null>(false, null, "Kullanıcı oluşturulurken hata oluştu");
        }
    },
    deleteUser: async (id: string): Promise<Result<null>> => {
        try {
            const result = await UserRepository.deleteUser(id);
            if (!result.success) {
                return createResult<null>(false, null, result.message);
            }
            return createResult<null>(true, null);

        } catch (error) {
            console.error("Delete User Error:", error);
            return createResult<null>(false, null, "Kullanıcı silinirken hata oluştu");
        }
    },
    getUser: async (id: string): Promise<Result<{
        id: string,
        name: string,
        surname : string,
        email: string,
        role: string
        bio: string|null,
        profilePic: string
        ledGroups: { id: string, name: string }[]
        groups: { id: string, name: string }[]
        projects: { id: string, name: string }[]
    } | null>> => {
        try {
            const result = await UserRepository.getIUserBasicInfoById(id);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(true, result.data);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult(false, null, "Kullanıcı bilgileri getirilirken hata oluştu");
        }
    }
    ,
    getUserByEmail: async (email: string): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const result = await UserRepository.getUserByEmail(email);
            if (!result.success) {
                return createResult<IUserBasicInfo>(false, null, "User not found");
            }
            return createResult<IUserBasicInfo>(true, result.data);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult<IUserBasicInfo>(false, null, "Kullanıcı bilgileri getirilirken hata oluştu");
        }
    },
    checkUserPasswordAndGetTokenInfos: async (data): Promise<Result<{
        id: string;
        role: string;
    } | null>> => {
        try {
            const result = await UserRepository.getUserPasswordAndTokenInfos(data.email);
            if (!result.success || !result.data) {
                console.log(result.message);
                return createResult(false, null, "E-posta veya şifre hatalı");
            }
            const isPasswordCorrect = await comparePassword(data.password, result.data.password);

            if (!isPasswordCorrect) {
                console.log("Şifre hatalı");
                return createResult(false, null, "E-posta veya şifre hatalı");
            }

            return createResult<{ id: string, role: string }>(true, result.data);
        } catch (error) {
            console.error("Check Password Error:", error);
            return createResult(false, null, "E-posta veya şifre hatalı");
        }
    },
    updateUserName: async (id: string, name: string): Promise<Result<null>> => {
        try {
            const result = await UserRepository.updateUserName(id, name)
            if (!result.success) {
                return createResult(false, null, result.message)
            }
            return createResult(true, null)
        } catch (error) {
            console.log("Update Username Error", error)
            return createResult(false, null, "Kullanıcı adı güncellenirken bir hata oluştu")
        }
    },
    updateUserEmail: async (id: string, email: string): Promise<Result<null>> => {
        try {
            const result = await UserRepository.updateUserEmail(id, email)
            if (!result.success) {
                return createResult(false, null, result.message)
            }
            return createResult(true, null)
        } catch (error) {
            console.log("Update Username Error", error)
            return createResult(false, null, "Kullanıcı e-postası güncellenirken bir hata oluştu")
        }
    },
    updateUserRole: async (id: string, role: string): Promise<Result<null>> => {
        try {
            const result = await UserRepository.updateUserRole(id, role)
            if (!result.success) {
                return createResult(false, null, result.message)
            }
            return createResult(true, null)
        } catch (error) {
            console.log("Update User Role Error", error)
            return createResult(false, null, "Kullanıcı rolü güncellenirken bir hata oluştu")
        }
    },
}

