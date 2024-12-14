import { createErrorResult, createSuccessResult } from "@/src/utils/returnFunctions"
import {PostRepository} from "@/src/features/posts/server/repository"
import { makeItUrl } from "@/src/utils/returnFunctions"


export const PostService: IPostService = {
    createPost: async (data: IPostCreation): Promise<IResult> => {
        try {
            const slug = makeItUrl(data.title)
            const result =  await PostRepository.createPost({ ...data, slug })
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(null)
        } catch (error) {
            return createErrorResult('Post oluşturulurken hata oluştu','SERVER_ERROR')}
    },
    getPostBySlug: async (slug: string): Promise<IResult<IPost>> => {
        try {
            const result = await PostRepository.getPostBySlug(slug)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(result.data)
        } catch (error) {
            return createErrorResult('Post getirilirken hata oluştu', 'SERVER_ERROR')
        }
    },
    updatePost: async (content: string, slug: string): Promise<IResult> => {
        try {
            const result = await PostRepository.updatePost(content, slug)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(result.data)
        } catch (error) {
            return createErrorResult('Post güncellenirken hata oluştu', 'SERVER_ERROR')
        }   
    },
    deletePost: async (slug: string): Promise<IResult> => {
        try {
            const result = await PostRepository.deletePost(slug)
            if (!result.success) {
                return createErrorResult(result.ERR_CODE, result.message)
            }
            return createSuccessResult(null)
        } catch (error) {
            return createErrorResult('Post silinirken hata oluştu', 'SERVER_ERROR')
        }
    }
}