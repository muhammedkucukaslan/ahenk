import {VoteRepository} from "@/src/features/votes/server/repository"
import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions"

export const VoteService: IVoteService = {
    votePost: async (slug: string, authorId: string, value: number) => {
        try {
            const result = await VoteRepository.votePost(slug, authorId, value);
            if(!result.success) {
                return createErrorResult(result.ERR_CODE, result.message);
            }
            return createSuccessResult(null);
        } catch (error: any) {
            return createErrorResult('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    },
    voteComment: async (id: string, authorId: string, value: number) => {
        try {
            const result = await VoteRepository.voteComment(id, authorId, value);
            if(!result.success) {
                return createErrorResult(result.ERR_CODE, result.message);
            }
            return createSuccessResult(null);
        } catch (error: any) {
            return createErrorResult('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    }
}