import { NextRequest, NextResponse } from 'next/server';
import { createResult } from '@/src/utils/returnFunctions';
import { createCommunitySchema } from '@/src/features/communities/validation';
import { CommunityService } from '@/src/features/communities/server/service';
export const CommunityController = {
    createCommunity: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const leaderId = req.headers.get('x-user-id');
            if (!leaderId) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem"), { status: 401 });
            }
            const { name, isPublic, description } = await req.json();

            await createCommunitySchema.validate({ name, leaderId, isPublic, description });

            const result = await CommunityService.createCommunity({ name, leaderId, isPublic, description });

            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message || "Topluluk oluşturulamadı"), { status: 400 });
            }

            return NextResponse.json(createResult(true, null), { status: 201 });
        } catch (error: any) {
            console.error("Create Community Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Topluluk oluşturulurken hata oluştu"), { status: 500 });
        }
    },
    getCommunityById: async (req: NextRequest, communityId: string): Promise<ResultResponse<null>> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem"), { status: 401 });
            }
            const isPermisible = await CommunityService.checkCommunityPermission(communityId, clientId);
            if (!isPermisible.success) {
                if (isPermisible.message) {

                    return NextResponse.json(createResult(false, null, isPermisible.message), { status: 400 });
                }
                const limitedResult = await CommunityService.getLimitedCommunityById(communityId);
                return NextResponse.json(createResult(true, { isPermisible: false, ...limitedResult.data}), { status: 200 });
            }
            const result = await CommunityService.getCommunityById(communityId);
            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message || "Topluluk bulunamadı"), { status: 404 });
            }
            return NextResponse.json(createResult(true, { isPermisible: true , ...result.data}), { status: 200 });
        } catch (error) {
        console.error("Get Community Error:", error);
            return NextResponse.json(createResult(false, null, "Topluluk bilgileri getirilirken hata oluştu"), { status: 500 });
        }
    }
}
