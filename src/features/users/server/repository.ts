import prisma from "@/src/lib/database/prisma";
import { IUserRepository } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";

export const UserRepository: IUserRepository = {
    createUser: async (data): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                },
            });
            return createResult<IUserBasicInfo>(true, user);
        } catch (error: any) {
            console.error("Create User Error:", error);
            if (error.code === "SQLITE_CONSTRAINT") {
                return createResult(false, null, "Bu e-posta adresi kullanılmaktadır");
            }
            return createResult(false, null, "Kullanıcı oluşturulurken hata oluştu");
        }
    },

    deleteUser: async (id): Promise<Result<null>> => {
        try {
            await prisma.user.delete({
                where: { id },
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Delete User Error:", error);
            return createResult(false, null, "Failed to delete user");
        }
    },

    getIUserBasicInfoById: async (id): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            }) as IUserBasicInfo;
            if (!user) {
                return createResult(false, null, "User not found");
            }
            return createResult<IUserBasicInfo>(true, user);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult(false, null, "Failed to retrieve user information");
        }
    },

    getUserByEmail: async (email): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    name: true,
                    email: true,
                    id: true,
                    role: true
                }
            })
            if (!user) {
                return createResult(false, null, "User not found");
            }
            return createResult<IUserBasicInfo>(true, user);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult(false, null, "Failed to retrieve user information");
        }
    },

    getUserPasswordAndTokenInfos: async (email: string): Promise<Result<{
        id: string,
        password: string,
        role: string
    } | null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    role: true,
                    password: true,
                },
            });
            if (!user) {
                return createResult(false, null, "User not found");
            }
            return createResult<{
                id: string,
                password: string,
                role: string
            }>(true, user);
        } catch (error) {
            console.error("Check User Password Error:", error);
            return createResult(false, null, "Şifre kontrolünde hata oluştu");
        }
    },

    updateUserName: async (id, name): Promise<Result<null>> => {
        try {
            await prisma.user.update({
                where: { id },
                data: {
                    name: name,
                },
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Update User Name Error:", error);
            return createResult(false, null, "Failed to update user name");
        }
    },

    updateUserEmail: async (id, email): Promise<Result<null>> => {
        try {
            await prisma.user.update({
                where: { id },
                data: {
                    email: email,
                },
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Update User Name Error:", error);
            return createResult(false, null, "Failed to update user email");
        }
    },

    updateUserRole: async (id, role): Promise<Result<null>> => {
        try {
            await prisma.user.update({
                where: { id },
                data: {
                    role: role,
                },
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Update User Name Error:", error);
            return createResult(false, null, "Failed to update user role");
        }
    },
}

