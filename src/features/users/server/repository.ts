import prisma from "@/src/lib/database/prisma";

export const userRepository = {
    createUser: async (data: { name: string; email: string }): Promise<number> => {
        try {
            await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                },
            });
            return 200
        } catch (error) {
            console.log(error)
            return 500
        }
    },

    getUserInformationsById: async (id: string): Promise<{ name: string; email: string, role: string } | null> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    email: true,
                    role: true,
                }
            })
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    },

    updateUserName: async (name: string) => {
        try {
            const user = await prisma.user.update({
                where: { id: "1" },
                data: {
                    name: name,
                },
            });
            return user;
        } catch (error) {
            return error
        }
    },

    updateUserEmail: async (email: string) => {
        try {
            const user = await prisma.user.update({
                where: { id: "1" },
                data: {
                    email: email,
                },
            });
            return user;
        } catch (error) {
            return error
        }
    },

    addFriend: async (userId: string, friendId: string) => {
        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    friends: {
                        connect: { id: friendId },
                    },
                },
            });
            return user;
        } catch (error) {
            return error
        }
    },

    removeFriend: async (userId: string, friendId: string) => {
        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    friends: {
                        disconnect: { id: friendId },  // Arkadaşı kaldırmak
                    },
                },
            });
            return user;
        } catch (error) {
            return error
        }
    },


}
