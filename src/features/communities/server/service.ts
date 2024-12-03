import { CommunityRepository } from './repository';
import { ICommunityService } from './interfaces';
import { createResult } from '@/src/utils/returnFunctions';

export const CommunityService: ICommunityService = {
    createCommunity: async (data): Promise<Result<null>> => {
        try {
            const result = await CommunityRepository.createCommunity(data);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(result.success, null, result.message);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createResult(false, null, "Topluluk oluşturulamadı");
        }
    },
    checkCommunityPermission: async (communityId: string, clientId: string): Promise<Result<boolean>> => {
        try {
            const isCommunityPublic = await CommunityRepository.isCommunityPublic(communityId);
            if (isCommunityPublic.message) {
                return createResult(false, false, isCommunityPublic.message);
            }

            if (isCommunityPublic.success) {
                return createResult(true, true);
            }

            const result = await CommunityRepository.isUserMember(communityId, clientId);

            if (result.success) {
                return createResult(true, true);
            }
            return createResult(false, false);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createResult(false, false, "Topluluk izni sorgulanırken hata oluştu");
        }
    },
    getLimitedCommunityById: async (communityId: string): Promise<Result<ILimitedCommunityProfile | null>> => {
        try {
            const result = await CommunityRepository.getLimitedCommunityById(communityId);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(true, result.data);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createResult(false, null, "Topluluk bilgileri getirilirken hata oluştu");
        }
    },
    getCommunityById: async (communityId: string): Promise<Result<ICommunityProfile | null>> => {
        try {
            const result = await CommunityRepository.getCommunityById(communityId);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(true, result.data);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createResult(false, null, "Topluluk bilgileri getirilirken hata oluştu");
        }
    }
}
