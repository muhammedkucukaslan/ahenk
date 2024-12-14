import prisma from "@/src/lib/database/prisma";
import { ITopicRepository } from "./interfaces";
import { createSuccessResult, createErrorResult } from "@/src/utils/returnFunctions";

export const TopicRepository: ITopicRepository = {
    isTopicExist: async (title: string): Promise<IResult> => {
        try {
            const data = await prisma.topic.findUnique({
                where: {
                    title: title
                }
            })
            if (data) {
                return createSuccessResult(null);
            }
            return createErrorResult('Konu bulunamadı', 'ALREADY_EXIST');
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    },
    createTopic: async (data: ITopicCreationWithSlug): Promise<IResult> => {
        try {
            await prisma.topic.create({ data })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    },
    getTopics: async (): Promise<IResult<ITopic[]>> => {
        try {
            const data = await prisma.topic.findMany()
            return createSuccessResult(data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    },
    getTopicBySlug: async (slug: string): Promise<IResult<ITopicProfile>> => {
        try {
            const data = await prisma.topic.findUnique({
                where: {
                    slug: slug
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    slug: true,
                    createdAt: true,
                    communities: {
                        select: {
                            posts: {
                                select: {
                                    id: true,
                                    title: true,
                                    content: true,
                                    createdAt: true,
                                    slug: true,
                                    community: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!data) {
                return createErrorResult('Konu bulunamadı', 'NOT_FOUND');
            }
            
            const posts = data.communities.flatMap((community) => {
                return community.posts.map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    slug: post.slug,
                    community: {
                        name: post.community.name
                    }
                }));
            });

           
            const formattedData = {
                id: data.id,
                title: data.title,
                content: data.content,
                slug: data.slug,
                createdAt: data.createdAt,
                posts: posts 
            };

            return createSuccessResult(formattedData);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    },
    updateTopicBySlug: async (slug: string, data: ITopicCreationWithSlug): Promise<IResult> => {
        try {
            await prisma.topic.update({
                where: {
                    slug: slug
                },
                data
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    },
    deleteTopicBySlug: async (slug: string): Promise<IResult> => {
        try {
            await prisma.topic.delete({
                where: {
                    slug: slug
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }
}