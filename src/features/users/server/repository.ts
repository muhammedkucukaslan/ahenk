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
            return createResult(false, null, "Kullanıcı silinirken hata oluştu");
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
                return createResult(false, null, "Kullanıcı bulunamadı");
            }
            return createResult<IUserBasicInfo>(true, user);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult(false, null, "Kullanıcı bilgileri getirilirken hata oluştu");
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
                return createResult(false, null, "Kullanıcı bulunamadı");
            }
            return createResult<IUserBasicInfo>(true, user);
        } catch (error) {
            console.error("Get User Info By Email Error:", error);
            return createResult(false, null, "Kullanıcı bilgileri getirilirken bir hata oluştu");
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
                return createResult(false, null, "Kullanıcı bulunamadı");
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
            return createResult(false, null, "Kullanıcı adı güncellenirken hata oluştu");
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
            return createResult(false, null, "Kullanıcı e-postası güncellenirken hata oluştu");
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
            return createResult(false, null, "Kullanıcı rolü güncellenirken hata oluştu");
        }
    },
}

