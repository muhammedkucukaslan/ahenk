import prisma from "@/src/lib/database/prisma";
import { createSuccessResult, createErrorResult } from "@/src/utils/returnFunctions";

export const CommentRepository: ICommentRepository = {
    createComment: async (data: ICommentCreation): Promise<IResult> => {
        try {
            await prisma.$transaction(async (prisma) => {
        
                const post = await prisma.post.findUnique({
                    where: { slug: data.postSlug }
                })
                if (!post) {
                    return createErrorResult('Post bulunamadı', 'NOT_FOUND')
                }
                await prisma.comment.create({
                    data: {
                        postId: post.id,
                        content: data.content,
                        authorId: data.authorId,
                    }
                });
            })
            return createSuccessResult(null);
        } catch (error) {
            console.error('error', error)
            return createErrorResult('Comment oluşturulurken hata oluştu', 'SERVER_ERROR');
        }
    },
    createReply: async (data: IReplyCreation): Promise<IResult> => {
        try {
            await prisma.$transaction(async (prisma) => {
                const comment = await prisma.comment.findUnique({
                    where: { id: data.commentId }
                })
                if (!comment) {
                    return createErrorResult('Comment bulunamadı', 'NOT_FOUND')
                }
                await prisma.comment.create({
                    data: {
                        postId: comment.postId,
                        parentId: comment.id,
                        content: data.content,
                        authorId: data.authorId
                    }
                });
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Reply oluşturulurken hata oluştu', 'SERVER_ERROR');
        }
    },
    updateComment: async (content: string, id: string): Promise<IResult> => {
        try {
            await prisma.comment.update({
                where: {
                    id
                },
                data: {
                    content
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Comment güncellenirken hata oluştu', 'SERVER_ERROR');
        }
    },
    deleteComment: async (id: string): Promise<IResult> => {
        try {
            await prisma.comment.delete({
                where: {
                    id
                }
            })
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Comment silinirken hata oluştu', 'SERVER_ERROR');
        }
    }
}