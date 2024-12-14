import prisma from "@/src/lib/database/prisma";
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions"
import { Select } from "@radix-ui/react-select";

export const VoteRepository: IVoteRepository = {
    votePost: async (slug: string, authorId: string, value: number): Promise<IResult> => {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    slug
                },
                select: {
                    id: true,
                    votes: {
                        where: {
                            authorId
                        }
                    }
                }
            });
            if (!post) {
                return createErrorResult('NOT_FOUND', 'Post bulunamadı');
            }

            const myVote = post.votes[0]

            if (!myVote) {
                await prisma.vote.create({
                    data: {
                        authorId,
                        postId: post.id,
                        value
                    }
                });
                return createSuccessResult(null);
            }
            if (myVote && value === 0) {
                await prisma.vote.delete({
                    where: {
                        id: myVote.id
                    }
                })
                return createSuccessResult(null);
            }

            if (myVote.value !== value) {
                await prisma.$transaction(async (prisma) => {
                    await prisma.vote.create({
                        data: {
                            authorId,
                            postId: post.id,
                            value
                        }
                    });
                    await prisma.vote.delete({
                        where: {
                            id: myVote.id
                        }
                    })
                })
                return createSuccessResult(null);
            }
            return createErrorResult('ALREADY_VOTED', 'Zaten oy vermişsiniz');
        } catch (error: any) {
            return createErrorResult('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    },
    voteComment: async (id: string, authorId: string, value: number): Promise<IResult> => {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    votes: {
                        where: {
                            authorId
                        }
                    }
                }
            });
            if (!comment) {
                return createErrorResult('NOT_FOUND', 'Comment bulunamadı');
            }
            const myVote = comment.votes[0]
            if (!myVote) {
                await prisma.vote.create({
                    data: {
                        authorId,
                        commentId: comment.id,
                        value
                    }
                });
                return createSuccessResult(null);
            }
            if (myVote && value === 0) {
                await prisma.vote.delete({
                    where: {
                        id: myVote.id
                    }
                })
                return createSuccessResult(null);
            }
            if (myVote.value !== value) {
                await prisma.$transaction(async (prisma) => {
                    await prisma.vote.create({
                        data: {
                            authorId,
                            commentId: comment.id,
                            value
                        }
                    });
                    await prisma.vote.delete({
                        where: {
                            id: myVote.id
                        }
                    })
                })
                return createSuccessResult(null);
            }
            return createErrorResult('ALREADY_VOTED', 'Zaten oy vermişsiniz');
        } catch (error: any) {
            return createErrorResult('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    }
}
