import prisma from "@/src/lib/database/prisma";
import { IUserRepository } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";
import { comparePassword } from "../utils/bcrypt";

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
        } catch (error) {
            console.error("Create User Error:", error);
            return createResult(false, null, "Failed to create user");
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

    getUserPassword: async (email: string): Promise<Result<string|null>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email : email },
                select: {
                    password: true,
                },
            });
            if (!user) {
                return createResult(false, null, "User not found");
            }
            return createResult<string>(true, user.password);
        } catch (error) {
            console.error("Check User Password Error:", error);
            return createResult(false, null, "Failed to check user password");
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



    // getUserByIdWithGroups: async (id): Promise<Result<IUserBasicInfo & { groups: Group[] }>> =>{
    //     try {   
    //         const user = await prisma.user.findUnique({
    //             where: { id },
    //             include: {
    //               groups: {
    //                 include: {
    //                   members: true,  // Grup üyelerini dahil et
    //                   projects: true, // Grup projelerini dahil et
    //                   leader: true,   // Grup liderini dahil et
    //                 },
    //               },
    //             },
    //           });

    //         if (!user) {
    //             return { success: false, message: 'User not found' }
    //           }


    //           const userBasicInfo: IUserBasicInfo = {
    //             id: user.id,
    //             name: user.name,
    //             email: user.email,
    //             role: user.role,
    //           };

    //           return {
    //             success: true,
    //             data: { ...userBasicInfo, groups: user.groups },
    //           }
    //     } catch (error) {
    //         console.error("Get User Friends Error:", error);
    //         return { success: false, message: "Failed to retrieve user friends" };
    //     }

}

