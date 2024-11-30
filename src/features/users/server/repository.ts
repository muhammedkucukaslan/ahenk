import prisma from "@/src/lib/database/prisma";
import { IUserRepository } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";

export const UserRepository: IUserRepository = {
    createUser: async (data): Promise<Result<{id: string , role : string} | null>> => {
        try {
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    surname: data.surname
                },
            });
            return createResult(true, user);
        } catch (error: any) {
            console.error("Create User Error:", error);
            return createResult(false, null, "Kullanıcı oluşturulurken hata oluştu");
        }
    },
    isEmailValid: async (email): Promise<Result<null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            })
            if (user) {
                return createResult(false, null, "Bu e-posta adresi kullanımda");
            }
            return createResult(true, null);
        } catch (error) {
            console.error("Check Email Error:", error);
            return createResult(false, null, "E-posta kontrolünde hata oluştu");
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

    getIUserBasicInfoById: async (id): Promise<Result<IUserProfile | null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    email: true,
                    role: true,
                    bio: true,
                    profilePic: true,
                    ledCommunities: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    communities: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    questions: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    posts: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
            if (!user) {
                return createResult(false, null, "Kullanıcı bulunamadı");
            }
            return createResult(true, user);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult(false, null, "Kullanıcı bilgileri getirilirken hata oluştu");
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
    }
}

