import prisma from "@/src/lib/database/prisma";
import { IUserRepository } from "./interfaces";
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions";

export const UserRepository: IUserRepository = {
    createUser: async (data): Promise<IResult<{ id: string, role: string }>> => {
        try {
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                },
            });
            return createSuccessResult({ id: user.id, role: user.role });
        } catch (error: any) {
            console.error("Create User Error:", error);
            return createErrorResult("Kullanıcı oluşturulurken hata oluştu", "SERVER_ERROR");
        }
    },
    isEmailValid: async (email): Promise<IResult> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            })
            if (user) {
                return createErrorResult("Bu e-posta adresi zaten kullanımda", "EMAIL_IN_USE");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Check Email Error:", error);
            return createErrorResult("E-posta kontrolünde hata oluştu", "SERVER_ERROR");
        }
    },
    isUsernameValid: async (username): Promise<IResult> => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: username },
            })
            if (user) {
                return createErrorResult("Bu kullanıcı adı zaten kullanımda", "USERNAME_IN_USE");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Check Username Error:", error);
            return createErrorResult("Kullanıcı adı kontrolünde hata oluştu", "SERVER_ERROR")
        }
    },
    deleteUser: async (id): Promise<IResult> => {
        try {
            await prisma.user.delete({
                where: { id },
            });
            return createSuccessResult(null);
        } catch (error) {
            console.error("Delete User Error:", error);
            return createErrorResult("Kullanıcı silinirken hata oluştu", "SERVER_ERROR");
        }
    },

    getCurrent: async (id): Promise<IResult<IUserProfile>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    bio: true,
                    profilePic: true,
                    createdAt: true,
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
                    posts: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true
                        }
                    }
                }
            });
            if (!user) {
                return createErrorResult("Kullanıcı bulunamadı", "USER_NOT_FOUND");
            }
            return createSuccessResult(user);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createErrorResult("Kullanıcı bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    getUserByUsername: async (username): Promise<IResult<ILimitedUserProfile>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: username },
                select: {
                    id: true,
                    username: true,
                    profilePic: true,
                    bio: true,
                    communities: {
                        select: {
                            id: true,
                            name: true
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
                return createErrorResult("Kullanıcı bulunamadı", "USER_NOT_FOUND");
            }
            return createSuccessResult(user);
        } catch (error) {
            console.error("Get User By Username Error:", error);
            return createErrorResult("Kullanıcı bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    getUserPasswordAndTokenInfos: async (email: string): Promise<IResult<{
        id: string,
        password: string,
        role: string
    }>> => {
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
                return createErrorResult("E-posta veya şifre hatalı", "INVALID_CREDENTIALS");
            }
            return createSuccessResult(user);
        } catch (error) {
            console.error("Check User Password Error:", error);
            return createErrorResult("E-posta veya şifre hatalı", "SERVER_ERROR");
        }
    },

    // updateUserName: async (id, username): Promise<Result<null>> => {
    //     try {
    //         await prisma.user.update({
    //             where: { id },
    //             data: {
    //                 username
    //             },
    //         });
    //         return createResult(true, null);
    //     } catch (error) {
    //         console.error("Update User Name Error:", error);
    //         return createResult(false, null, "Kullanıcı adı güncellenirken hata oluştu");
    //     }
    // },

    // updateUserEmail: async (id, email): Promise<Result<null>> => {
    //     try {
    //         await prisma.user.update({
    //             where: { id },
    //             data: {
    //                 email: email,
    //             },
    //         });
    //         return createResult(true, null);
    //     } catch (error) {
    //         console.error("Update User Name Error:", error);
    //         return createResult(false, null, "Kullanıcı e-postası güncellenirken hata oluştu");
    //     }
    // }
}

