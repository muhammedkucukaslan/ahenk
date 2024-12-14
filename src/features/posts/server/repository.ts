import prisma from "@/src/lib/database/prisma";
import { createSuccessResult, createErrorResult } from "@/src/utils/returnFunctions";

export const PostRepository: IPostRepository = {
    createPost: async (data: IPostCreationWithSlug): Promise<IResult> => {
        try {
            await prisma.post.create({
                data: {
                    title: data.title,
                    content: data.content,
                    authorId: data.authorId,
                    slug: data.slug,
                    communityName: data.communityName,
                }
            });
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Post oluşturulurken hata oluştu', 'SERVER_ERROR');
        }
    },
    getPostBySlug: async (slug: string): Promise<IResult<IPost>> => {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    slug
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    author: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        where: {
                            parentId: null
                        },
                        select: {
                            id: true,
                            content: true,
                            author: {
                                select: {
                                    id: true,
                                    username: true
                                }
                            },
                            createdAt: true,
                            children: {
                                select: {
                                    id: true,
                                    content: true,
                                    author: {
                                        select: {
                                            id: true,
                                            username: true
                                        }
                                    },
                                    createdAt: true
                                }
                            }
                        }
                    },

                    votes: {
                        select: {
                            value: true
                        }
                    }
                }
            })
            if (!post) {
                return createErrorResult('Post bulunamadı', 'NOT_FOUND');
            }
            const votes = post.votes.reduce((acc, vote) => acc + vote.value, 0)
            const { votes: _, ...postWithoutVotes } = post;
            return createSuccessResult({ votes, ...postWithoutVotes });
        } catch (error) {
            return createErrorResult('Post getirilirken hata oluştu', 'SERVER_ERROR');
        }
    },
    updatePost: async (content: string, slug: string): Promise<IResult> => {
        try {
            await prisma.post.update({
                where: {
                    slug: slug
                },
                data: {
                    content
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Post güncellenirken hata oluştu', 'SERVER_ERROR');
        }
    },
    deletePost: async (slug: string): Promise<IResult> => {
        try {
            await prisma.post.delete({
                where: {
                    slug
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Post silinirken hata oluştu', 'SERVER_ERROR');
        }
    }
}