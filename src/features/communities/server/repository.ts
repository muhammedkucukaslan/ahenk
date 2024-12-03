import prisma from "@/src/lib/database/prisma";
import { ICommunityRepository } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";

export const CommunityRepository: ICommunityRepository = {
    createCommunity: async (data): Promise<Result<null>> => {
        try {
            await prisma.$transaction(async (prisma) => {
                const community = await prisma.community.create({
                    data: {
                        name: data.name,
                        isPublic: data.isPublic,
                        leaders: {
                            connect: { id: data.leaderId },
                        },
                    },
                });

                await prisma.community.update({
                    where: {
                        id: community.id,
                    },
                    data: {
                        members: {
                            connect: { id: data.leaderId },
                        },
                    },
                });
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createResult(false, null, "Topluluk oluşturulamadı");
        }
    },
    isCommunityPublic: async (communityId: string): Promise<Result<null>> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    id: communityId,
                },
                select: {
                    isPublic: true,
                }
            })
            if (!data) {
                return createResult(false, null, "Topluluk bulunamadı");
            }

            if (!data.isPublic) {
                return createResult(false, null);
            }
            return createResult(true, null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createResult(false, null, "Topluluk sorgulamada hata oluştu");
        }
    },
    isUserMember: async (communityId: string, clientId: string): Promise<Result<null>> => {
        try {
            const data = await prisma.community.findFirst({
                where: {
                    id: communityId,
                    members: {
                        some: {
                            id: clientId,
                        },
                    },
                },
            });

            if (!data) {
                return createResult(false, null);
            }
            return createResult(true, null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createResult(false, null, "Kullacının katılımcı olduğu sorgulanırken hata oluştu");
        }
    },
    getLimitedCommunityById: async (communityId: string): Promise<Result<ILimitedCommunityProfile | null>> => {
        try {
            const community = await prisma.community.findUnique({
                where: {
                    id: communityId,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    description: true,
                    leaders: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    members: {
                        select: {
                            id: true,
                        },
                    },
                    createdAt: true
                },
            });

            if (!community) {
                return createResult(false, null, "Topluluk bulunamadı");
            }
            const membersCount = community.members.length;
            return createResult(true, {
                membersCount,
                ...community,
            })

        } catch (error) {
            console.error("Community Repository Error:", error);
            return createResult(false, null, "Topluluk bilgileri getirilirken hata oluştu");
        }
    },
    getCommunityById: async (communityId: string): Promise<Result<ICommunityProfile | null>> => {
        try {
            const community = await prisma.community.findUnique({
                where: {
                    id: communityId,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    description: true,
                    leaders: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    members: {
                        select: {
                            id: true,
                            name: true,
                            surname: true 
                        },
                    },
                topics: {
                        select:{
                            id: true,
                            title: true  
                        }
                    },
                    createdAt: true
                },
            });

            if (!community) {
                return createResult(false, null, "Topluluk bulunamadı");
            }

            return createResult(true, {
                communityInfos: {
                    id: community.id,
                    name: community.name,
                    description: community.description,
                    isPublic: community.isPublic,
                    leaders: community.leaders,
                    membersCount: community.members.length,
                    createdAt: community.createdAt
                },
                members: community.members,
                topics: community.topics,
            });
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createResult(false, null, "Topluluk bilgileri getirilirken hata oluştu");
        }
    }
}

