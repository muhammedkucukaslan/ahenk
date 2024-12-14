

import { NextRequest } from "next/server";
import { handleErrorResponse, handleSuccessResponse } from "@/src/utils/returnFunctions";
import { CommentService } from "@/src/features/comments/server/service";

export const CommentController: ICommentController = {
    createComment: async (req: NextRequest, postSlug: string): Promise<IResponse> => {
        try {
            const authorId = req.headers.get('x-user-id');
            if (!authorId) {
                return handleErrorResponse('AUTHORIZATION_ERROR', 'Kullanıcı kimliği bulunamadı');
            }
            const { content } = await req.json();

            const result = await CommentService.createComment({ content, postSlug, authorId });
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Comment oluşturulurken hata oluştu');
        }
    },
    updateComment: async (req: NextRequest, id: string): Promise<IResponse> => {
        try {
            const { content } = await req.json();
            if (!id) {
                return handleErrorResponse('VALIDATION_ERROR', 'Id bilgisi bulunamadı');
            }

            const result = await CommentService.updateComment(content, id);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error) {
            return handleErrorResponse('SERVER_ERROR', 'Comment güncellenirken hata oluştu');
        }
    },
    deleteComment: async (req: NextRequest, id: string): Promise<IResponse> => {
        try {
            if (!id) {
                return handleErrorResponse('VALIDATION_ERROR', 'Slug bilgisi bulunamadı');
            }

            const result = await CommentService.deleteComment(id);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error) {
            return handleErrorResponse('SERVER_ERROR', 'Comment silinirken hata oluştu');
        }
    },
    createReply: async (req: NextRequest): Promise<IResponse> => {
        try {
            const authorId = req.headers.get('x-user-id');
            if (!authorId) {
                return handleErrorResponse('AUTHORIZATION_ERROR', 'Kullanıcı kimliği bulunamadı');
            }
            const { content, commentId } = await req.json();

            const result = await CommentService.createReply({ content, commentId, authorId });
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201)
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Reply oluşturulurken hata oluştu');
        }
    }
}


interface ICommentController {
    createComment(req: NextRequest, communityName: string): Promise<IResponse>;
    updateComment(req: NextRequest, id: string): Promise<IResponse>;
    deleteComment(req: NextRequest, id: string): Promise<IResponse>;
    createReply(req: NextRequest): Promise<IResponse>;
}