import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions"
import { CommentRepository } from "@/src/features/comments/server/repository"

export const CommentService: ICommentService = {
    createComment: async (data: ICommentCreation): Promise<IResult> => {
        try {
            const result = await CommentRepository.createComment(data)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(null)
        } catch (error) {
            return createErrorResult('Comment oluşturulurken hata oluştu', 'SERVER_ERROR')
        }
    },
    createReply: async (data: IReplyCreation): Promise<IResult> => {
        try {
            const result = await CommentRepository.createReply(data)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(null)
        } catch (error) {
            return createErrorResult('Reply oluşturulurken hata oluştu', 'SERVER_ERROR')
        }
    },
    updateComment: async (content: string, id : string ): Promise<IResult> => {
        try {
            const result = await CommentRepository.updateComment(content, id )
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(result.data)
        } catch (error) {
            return createErrorResult('Comment güncellenirken hata oluştu', 'SERVER_ERROR')
        }
    },
    deleteComment: async (id: string): Promise<IResult> => {
        try {
            const result = await CommentRepository.deleteComment(id)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(null)
        } catch (error) {
            return createErrorResult('Comment silinirken hata oluştu', 'SERVER_ERROR')
        }
    }
}