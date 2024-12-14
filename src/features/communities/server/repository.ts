import prisma from "@/src/lib/database/prisma";
import { ICommunityRepository } from "./interfaces";
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions";

export const CommunityRepository: ICommunityRepository = {
    getCommunities: async (): Promise<IResult<ICommunity[]>> => {
        try {
            const data = await prisma.community.findMany({
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    description: true,
                    createdAt: true,
                    _count: {
                        select: {
                            members: true,
                        },
                    },
                },
            });

            const formattedData = data.map((community) => ({
                id: community.id,
                name: community.name,
                description: community.description,
                isPublic: community.isPublic,
                createdAt: community.createdAt,
                membersCount: community._count.members,
            }));

            return createSuccessResult(formattedData);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluklar getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    createCommunity: async (data): Promise<IResult> => {
        try {
            await prisma.$transaction(async (prisma) => {
                const community = await prisma.community.create({
                    data: {
                        name: data.name,
                        isPublic: data.isPublic,
                        leaders: {
                            connect: { id: data.leaderId },
                        },
                        description: data.description,
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

                for (const topicId of data.topics) {
                    await prisma.topic.update({
                      where: { id: topicId },
                      data: {
                        communities: {
                          connect: { id: community.id },
                        },
                      },
                    });
                  }
            });
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk oluşturulurken bir hata oluştu", "SERVER_ERROR");
        }
    },
    isCommunityExist: async (communityName: string): Promise<IResult> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    name: communityName,
                },
            });

            if (!data) {
                return createErrorResult("Topluluk bulunamadı", "NOT_FOUND");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk sorgulanırken hata oluştu", "SERVER_ERROR");
        }
    },
    isNameExist: async (name: string): Promise<IResult> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    name: name,
                },
            });

            if (data) {
                return createErrorResult("Topluluk adı zaten kullanılmakta", "BAD_REQUEST");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk adı sorgulanırken hata oluştu", "SERVER_ERROR");
        }
    },
    isCommunityPublic: async (communityName: string): Promise<IResult> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    name: communityName,
                }
            })
            if (!data) {
                return createErrorResult("Topluluk bulunamadı", "NOT_FOUND");
            }
            if (data.isPublic) {
                return createSuccessResult(null);
            }
            return createErrorResult("Topluluk gizli", "FORBIDDEN");
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    isUserMember: async (communityName: string, clientId: string): Promise<IResult> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    name: communityName,
                    members: {
                        some: {
                            id: clientId
                        }
                    },

                }
            });

            if (!data) {
                return createErrorResult("Kullanıcı topluluğa üye değil", "FORBIDDEN");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    isLeader: async (communityName: string, clientId: string): Promise<IResult> => {
        try {
            const data = await prisma.community.findUnique({
                where: {
                    name: communityName,
                    leaders: {
                        some: {
                            id: clientId
                        }
                    }
                }
            })
            if (!data) {
                return createErrorResult("Kullanıcı topluluğun lideri değil", "FORBIDDEN");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    updateCommunity: async (communityName: string, updateData): Promise<IResult> => {
        try {
            const data = await prisma.community.update({
                where: {
                    name: communityName,
                },
                data: {
                    name: updateData.name,
                    isPublic: updateData.isPublic,
                    description: updateData.description,
                },
            })

            if (!data) {
                return createErrorResult("Topluluk güncellenirken bir hata oluştu", "NOT_FOUND");
            }
            return createSuccessResult(null);

        } catch (error) {
            return createErrorResult("Topluluk güncellenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    updateCommunityName: async (communityName: string, name: string): Promise<IResult> => {
        try {
            const data = await prisma.community.update({
                where: {
                    name: communityName,
                },
                data: {
                    name,
                },
            });

            if (!data) {
                return createErrorResult("Topluluk adı güncellenirken bir hata oluştu", "NOT_FOUND");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk adı güncellenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    updateCommunityDescription: async (communityName: string, description: string): Promise<IResult> => {
        try {
            const data = await prisma.community.update({
                where: {
                    name: communityName,
                },
                data: {
                     description,
                },
            });

            if (!data) {
                return createErrorResult("Topluluk açıklaması güncellenirken bir hata oluştu", "NOT_FOUND");
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk açıklaması güncellenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    updateCommunityIsPublic: async (communityName: string, isPublic: boolean): Promise<IResult> => {
        try {
            const data = await prisma.community.update({
                where: {
                    name: communityName,
                },
                data: {
                    isPublic,
                },
            });

            if (!data) {
                return createErrorResult("Topluluk gizliliği güncellenirken bir hata oluştu", "NOT_FOUND");
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Topluluk gizliliği güncellenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    getLimitedCommunityByName: async (communityName: string): Promise<IResult<ICommunityProfile>> => {
        try {
            const community = await prisma.community.findUnique({
                where: {
                    name: communityName,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    description: true,
                    leaders: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    createdAt: true
                },
            });

            if (!community) {
                return createErrorResult("Topluluk bulunamadı", "NOT_FOUND");
            }
            return createSuccessResult({
                ...community,
                members: [],
                topics: [],
                posts: []
            });

        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR")
        }
    },
    getCommunityByName: async (communityName: string): Promise<IResult<ICommunityProfile>> => {
        try {
            const community = await prisma.community.findUnique({
                where: {
                    name: communityName,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    description: true,
                    leaders: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    members: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    posts: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    createdAt: true
                },
            });

            if (!community) {
                return createErrorResult("Topluluk bulunamadı", "NOT_FOUND");
            }
            return createSuccessResult(community);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    getMembers: async (communityName: string): Promise<IResult<ICommunityMember[]>> => {
        try {
            const data = await prisma.community.findUnique({
                where: { name: communityName },
                select: {
                    members: {
                        select: {
                            id: true,
                            username: true,
                            createdAt: true,
                            profilePic: true
                        },
                    },
                }
            })

            if (!data) {
                return createErrorResult("Topluluk bulunamadı", "NOT_FOUND");
            }
            return createSuccessResult(data.members);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Üyeler getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    joinCommunity: async (communityName: string, clientId: string): Promise<IResult> => {
        try {
            await prisma.community.update({
                where: { name: communityName },
                data: {
                    members: {
                        connect: { id: clientId }
                    }
                }
            });
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Repository Error:", error);
            return createErrorResult("Topluluğa katılırken bir hata oluştu", "SERVER_ERROR");
        }
    },
    addMember: async (communityName: string, memberId: string): Promise<IResult> => {
        try {
            await prisma.community.update({
                where: { name: communityName },
                data: {
                    members: {
                        connect: { id: memberId }
                    }
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye eklenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    removeMember: async (communityName: string, memberId: string): Promise<IResult> => {
        try {
            await prisma.community.update({
                where: { name: communityName },
                data: {
                    members: {
                        disconnect: { id: memberId }
                    }
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye eklenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    promoteMember: async (communityName: string, memberId: string): Promise<IResult> => {
        try {
            await prisma.community.update({
                where: { name: communityName },
                data: {
                    leaders: {
                        connect: { id: memberId }
                    }
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye lider yapılırken bir hata oluştu", "SERVER_ERROR");
        }
    },
    demoteMember: async (communityName: string, memberId: string): Promise<IResult> => {
        try {
            await prisma.community.update({
                where: { name: communityName },
                data: {
                    leaders: {
                        disconnect: { id: memberId }
                    }
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye liderlikten çıkarılırken bir hata oluştu", "SERVER_ERROR");
        }
    }
}

