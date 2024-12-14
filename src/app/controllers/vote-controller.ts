import { NextRequest } from "next/server";
import { handleErrorResponse, handleSuccessResponse } from "@/src/utils/returnFunctions";
import { VoteService } from "@/src/features/votes/server/service";

export const VoteController: IVoteController = {
    votePost: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const authorId = req.headers.get("x-user-id");
            if (!authorId) {
                return handleErrorResponse('UNAUTHORIZED', 'Kullanıcı bulunamadı');
            }
            const { value } = await req.json();
            const result = await VoteService.votePost(slug, authorId, value);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    },
    voteComment: async (req: NextRequest, id: string): Promise<IResponse> => {
        try {
            const authorId = req.headers.get("x-user-id");
            if (!authorId) {
                return handleErrorResponse('UNAUTHORIZED', 'Kullanıcı bulunamadı');
            }
            const { value } = await req.json();
            const result = await VoteService.voteComment(id, authorId, value);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error: any) {
            return handleErrorResponse('SERVER_ERROR', 'Oy verme işleminde hata oluştu');
        }
    }
}

interface IVoteController {
    votePost(req: Request, slug: string): Promise<IResponse>;
    voteComment(req: Request, id: string): Promise<IResponse>;
}