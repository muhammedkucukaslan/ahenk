import { NextRequest, NextResponse } from 'next/server';
import { handleErrorResponse, handleSuccessResponse, validateData } from '@/src/utils/returnFunctions';
import { createCommunitySchema } from '@/src/features/communities/validation';
import { CommunityService } from '@/src/features/communities/server/service';

export const CommunityController: ICommunityController = {
    getCommunities: async (req: NextRequest): Promise<IResponse> => {
        try {
            const result = await CommunityService.getCommunities();
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(result.data);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Topluluklar getirilirken bir hata oluştu");
        }
    },
    createCommunity: async (req: NextRequest): Promise<IResponse> => {
        try {
            const userId = req.headers.get('x-user-id');
            if (!userId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const { name, isPublic, description, topics } = await req.json();

            const validatedData = await validateData({ name, leaderId: userId, isPublic, description, topics }, createCommunitySchema);
            if (!validatedData) {
                return handleErrorResponse("BAD_REQUEST", "Invalid data")
            }

            const result = await CommunityService.createCommunity({ name, leaderId: userId, isPublic, description, topics });
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE!, result.message!)
            }
            return handleSuccessResponse(null, 201);
        } catch (error: any) {
            console.error("Create Community Error:", error);
            return handleErrorResponse("SERVER_ERROR", "Topluluk oluşturulurken bir hata oluştu");
        }
    },
    updateCommunity: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const body = await req.json() as ICommunityUpdation
            const result = await CommunityService.updateCommunity(communityName, clientId, body);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);

        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Topluluk güncellenirken bir hata oluştu");
        }
    },
    updatePartialPartOfCommunity: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const url = new URL(req.url);
            const field = url.searchParams.get('field')
            const body = await req.json();
            const result = await CommunityService.updatePartialPartOfCommunity(communityName, clientId, body, field!);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Topluluk güncellenirken bir hata oluştu");
        }
    },
    getCommunityByName: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            const result = await CommunityService.getCommunityByName(communityName, clientId!);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(result.data);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Topluluk bilgileri getirilirken bir hata oluştu");
        }
    },
    getMembers: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            const result = await CommunityService.getMembers(communityName, clientId!);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(result.data);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Üyeler getirilirken bir hata oluştu");
        }
    },
    joinCommunity: async (req: NextRequest, communityName: string): Promise<IResponse> => {
        try {
            const userId = req.headers.get('x-user-id');
            if (!userId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const result = await CommunityService.joinCommunity(communityName, userId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Topluluğa katılırken bir hata oluştu");
        }
    },
    addMember: async (req: NextRequest, communityName: string, memberId: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const result = await CommunityService.addMember(communityName, clientId, memberId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Üye eklenirken bir hata oluştu");
        }
    },
    removeMember: async (req: NextRequest, communityName: string, memberId: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }
            const result = await CommunityService.removeMember(communityName, clientId, memberId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null, 201);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Üye silinirken bir hata oluştu");
        }
    },
    promoteMember: async (req: NextRequest, communityName: string, memberId: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }

            const result = await CommunityService.promoteMember(communityName, clientId, memberId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Lider eklenirken bir hata oluştu");
        }
    },
    demoteMember: async (req: NextRequest, communityName: string, memberId: string): Promise<IResponse> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return handleErrorResponse("UNAUTHORIZED", "Yetkilendirme hatası");
            }

            const result = await CommunityService.demoteMember(communityName, clientId, memberId);
            if (!result.success) {
                return handleErrorResponse(result.ERR_CODE, result.message);
            }
            return handleSuccessResponse(null);
        } catch (error) {
            return handleErrorResponse("SERVER_ERROR", "Lider kaldırılırken bir hata oluştu");
        }
    }
}


interface ICommunityController {
    getCommunities: (req: NextRequest) => Promise<IResponse>;
    createCommunity: (req: NextRequest) => Promise<IResponse>;
    getCommunityByName: (req: NextRequest, communityName: string) => Promise<IResponse>;
    getMembers: (req: NextRequest, communityName: string) => Promise<IResponse>;
    updatePartialPartOfCommunity: (req: NextRequest, communityName: string) => Promise<IResponse>;
    updateCommunity: (req: NextRequest, communityName: string) => Promise<IResponse>;
    joinCommunity: (req: NextRequest, communityName: string) => Promise<IResponse>;
    addMember: (req: NextRequest, communityName: string, memberId: string) => Promise<IResponse>;
    removeMember: (req: NextRequest, communityName: string, memberId: string) => Promise<IResponse>;
    promoteMember: (req: NextRequest, communityName: string, memberId: string) => Promise<IResponse>;
    demoteMember: (req: NextRequest, communityName: string, memberId: string) => Promise<IResponse>;
}
