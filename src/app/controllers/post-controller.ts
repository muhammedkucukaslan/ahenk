import { NextRequest, userAgent } from "next/server";
import { handleErrorResponse, handleSuccessResponse } from "@/src/utils/returnFunctions";
import { postSchema } from "@/src/features/posts/server/validation";
import { validateData } from "@/src/utils/returnFunctions";
import { PostService } from "@/src/features/posts/server/service";

export const PostController: IPostController = {
    getPostBySlug: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const result = await PostService.getPostBySlug(slug);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(result.data);
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Post getirilirken hata oluştu');
        }
    },
    createPost: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const authorId = req.headers.get('x-user-id');
            if (!authorId) {
                return handleErrorResponse('AUTHORIZATION_ERROR', 'Kullanıcı kimliği bulunamadı');
            }

            const { title, content } = await req.json();
            console.log('validatedData', { title, content, communityName, authorId });
            // const validatedData = await validateData({ title, content, communityName, authorId }, postSchema);
            // if (!validatedData) {
            //     return handleErrorResponse('VALIDATION_ERROR', "Gerekli alanları doldurunuz");
            // }

            const result = await PostService.createPost({ title, content, communityName, authorId });
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Post oluşturulurken hata oluştu');
        }
    },
    updatePost: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const { content } = await req.json();
            if (!slug) {
                return handleErrorResponse('VALIDATION_ERROR', 'Slug bilgisi bulunamadı');
            }

            const result = await PostService.updatePost( content, slug );
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error) {
            return handleErrorResponse('SERVER_ERROR', 'Post güncellenirken hata oluştu');
        }
    },
    deletePost: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            if (!slug) {
                return handleErrorResponse('VALIDATION_ERROR', 'Slug bilgisi bulunamadı');
            }

            const result = await PostService.deletePost(slug);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error) {
            return handleErrorResponse('SERVER_ERROR', 'Post silinirken hata oluştu');
        }
    }
}


interface IPostController {
    // getPosts(req: NextRequest): void;
    getPostBySlug(req: NextRequest, slug: string): Promise<IResponse>;
    createPost(req: NextRequest, communityName: string): Promise<IResponse>;
    updatePost(req: NextRequest, slugString: string): Promise<IResponse>;
    deletePost(req: NextRequest,slugString: string): Promise<IResponse>;
    // updatePost(req: NextRequest): void;
    // deletePost(req: NextRequest): void;
}