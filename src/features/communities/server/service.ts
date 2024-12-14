import { CommunityRepository } from './repository';
import { ICommunityService } from './interfaces';
import { createErrorResult, createSuccessResult } from '@/src/utils/returnFunctions';
import { cp } from 'fs';

export const CommunityService: ICommunityService = {
    getCommunities: async (): Promise<IResult<ICommunity[]>> => {
        try {
            const result = await CommunityRepository.getCommunities();
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createErrorResult("Topluluklar getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    createCommunity: async (data): Promise<IResult> => {
        try {
            const isNameExist = await CommunityRepository.isNameExist(data.name);
            if (!isNameExist.success) {
                return createErrorResult(isNameExist.message, isNameExist.ERR_CODE!);
            }
            const result = await CommunityRepository.createCommunity(data);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error("Community Service Error:", error);
            return createErrorResult("Topluluk oluşturulurken bir hata oluştu", "SERVER_ERROR");
        }
    },
    getCommunityByName: async (communityName: string, clientId?: string): Promise<IResult<ICommunityProfile>> => {
        try {
            const isCommunityPublic = await CommunityRepository.isCommunityPublic(communityName);
            if (isCommunityPublic.success) {
                const result = await CommunityRepository.getCommunityByName(communityName);
                if (!result.success) {
                    return createErrorResult(result.message, result.ERR_CODE!);
                }
                return createSuccessResult(result.data);
            }

            if (isCommunityPublic.ERR_CODE === "NOT_FOUND") {
                return createErrorResult(isCommunityPublic.message, isCommunityPublic.ERR_CODE!);
            }

            if (!clientId) {
                const result = await CommunityRepository.getLimitedCommunityByName(communityName);
                if (!result.success) {
                    return createErrorResult(isCommunityPublic.message, isCommunityPublic.ERR_CODE!);
                }
                return createSuccessResult(result.data);
            }

            const isUserMember = await CommunityRepository.isUserMember(communityName, clientId);
            if (isUserMember.success) {
                const result = await CommunityRepository.getCommunityByName(communityName);
                if (!result.success) {
                    return createErrorResult(result.message, result.ERR_CODE!);
                }
                return createSuccessResult(result.data);
            }
            const result = await CommunityRepository.getLimitedCommunityByName(communityName);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(result.data);

        } catch (error) {
            console.error("Community Service Error:", error);
            return createErrorResult("Topluluk bilgileri getirilirken hata oluştu", "SERVER_ERROR");
        }
    },
    getMembers: async (communityId: string, clientId?: string): Promise<IResult<ICommunityMember[]>> => {
        try {

            const isCommunityPublic = await CommunityRepository.isCommunityPublic(communityId);
            if (!isCommunityPublic.success) {
                if (isCommunityPublic.ERR_CODE === "NOT_FOUND") {
                    return createErrorResult(isCommunityPublic.message, isCommunityPublic.ERR_CODE!);
                }
                if (clientId) {
                    const isUserMember = await CommunityRepository.isUserMember(communityId, clientId);
                    if (isUserMember.success) {
                        const result = await CommunityRepository.getMembers(communityId);
                        if (!result.success) {
                            return createErrorResult(result.message, result.ERR_CODE!);
                        }
                        return createSuccessResult(result.data);
                    }
                }
                return createErrorResult(isCommunityPublic.message, isCommunityPublic.ERR_CODE!);
            }
            const result = await CommunityRepository.getMembers(communityId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult("Üyeler getirilirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    updateCommunity: async (communityName: string, clientId: string, updateData: ICommunityUpdation): Promise<IResult> => {
        try {
            const isLeader = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeader.success) {
                return createErrorResult("Bu topluluğun lideri değilsiniz", isLeader.ERR_CODE!);
            }
            const isNameExist = await CommunityRepository.isNameExist(updateData.name);
            if (!isNameExist.success) {
                return createErrorResult(isNameExist.message, isNameExist.ERR_CODE!);
            }
            const result = await CommunityRepository.updateCommunity(communityName, updateData);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Topluluk güncellenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    updatePartialPartOfCommunity: async (communityName: string, clientId: string, updateField: any, field: string): Promise<IResult> => {
        try {
            const isCommunityExist = await CommunityRepository.isCommunityExist(communityName);
            if (!isCommunityExist.success) {
                return createErrorResult(isCommunityExist.message, isCommunityExist.ERR_CODE!);
            }
            const isLeader = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeader.success) {
                return createErrorResult("Bu topluluğun lideri değilsiniz", isLeader.ERR_CODE!);
            }

            if (field === "name") {
                if (updateField.name.includes(" ")) {
                    return createErrorResult("Topluluk adı boşluk içeremez", "INVALID_DATA");
                }

                if(updateField.name !== updateField.name.toLowerCase()){
                    return createErrorResult("Topluluk adı büyük harfli olamaz", "INVALID_DATA");
                }

                const isNameExist = await CommunityRepository.isNameExist(updateField.name);
                if (!isNameExist.success) {
                    return createErrorResult(isNameExist.message, isNameExist.ERR_CODE!);
                }
                const result = await CommunityRepository.updateCommunityName(communityName, updateField.name);
                if (!result.success) {
                    return createErrorResult(result.message, result.ERR_CODE!);
                }
                return createSuccessResult(null);
            }
            if (field === "description") {
                const result = await CommunityRepository.updateCommunityDescription(communityName, updateField.description);
                if (!result.success) {
                    return createErrorResult(result.message, result.ERR_CODE!);
                }
                return createSuccessResult(null);
            }

            if (field === "isPublic") {
                const result = await CommunityRepository.updateCommunityIsPublic(communityName, updateField.isPublic);
                if (!result.success) {
                    return createErrorResult(result.message, result.ERR_CODE!);
                }
                return createSuccessResult(null);
            }
            return createErrorResult("Geçersiz alan", "INVALID_FIELD");
        } catch (error) {
            return createErrorResult("Topluluk güncellenirken bir hata oluştu", "SERVER_ERROR");
        }

    },
    joinCommunity: async (communityName: string, clientId: string): Promise<IResult> => {
        try {

            const isCommunityPublic = await CommunityRepository.isCommunityPublic(communityName);
            if (!isCommunityPublic.success) {
                return createErrorResult(isCommunityPublic.message, isCommunityPublic.ERR_CODE);
            }

            const isUserMember = await CommunityRepository.isUserMember(communityName, clientId);
            if (isUserMember.success) {
                return createErrorResult("Zaten bu topluluğun bir üyesisiniz", "ALREADY_MEMBER");
            }


            const result = await CommunityRepository.joinCommunity(communityName, clientId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);

        } catch (error) {
            return createErrorResult("Topluluğa katılırken bir hata oluştu", "SERVER_ERROR");
        }
    },
    addMember: async (communityName: string, clientId: string, memberId: string): Promise<IResult> => {
        try {
            const isMember = await CommunityRepository.isUserMember(communityName, memberId);
            if (isMember.success) {
                return createErrorResult("Kullanıcı bu topluluğa üye zaten", "ALREADY_MEMBER");
            }
            const isLeader = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeader.success) {
                return createErrorResult("Bu topluluğun lideri değilsiniz", isLeader.ERR_CODE!);
            }
            const result = await CommunityRepository.addMember(communityName, memberId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye eklenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    removeMember: async (communityName: string, clientId: string, memberId: string): Promise<IResult> => {
        try {
            const isMember = await CommunityRepository.isUserMember(communityName, memberId);
            if (!isMember.success) {
                return createErrorResult("Kullanıcı topluluğun üyesi değil zaten", "NOT_MEMBER");
            }

            const isLeader = await CommunityRepository.isLeader(communityName, memberId);
            if (isLeader.success) {
                return createErrorResult("Kullanıcı lider olduğu için silinemez", "LEADER_CANNOT_BE_REMOVED");
            }
            const isLeaderClient = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeaderClient.success) {
                return createErrorResult("Bu topluluğun lideri değilsiniz", isLeaderClient.ERR_CODE);
            }
            const result = await CommunityRepository.removeMember(communityName, memberId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Üye silinirken bir hata oluştu", "SERVER_ERROR");

        }
    },
    promoteMember: async (communityName: string, clientId: string, memberId: string): Promise<IResult> => {
        try {

            const isUserMember = await CommunityRepository.isUserMember(communityName, memberId);
            if (!isUserMember.success) {
                return createErrorResult("Kullanıcı topluluğun üyesi değil", isUserMember.ERR_CODE!);
            }

            const isLeader = await CommunityRepository.isLeader(communityName, memberId);
            if (isLeader.success) {
                return createErrorResult("Kullanıcı zaten lider", "ALREADY_LEADER");
            }

            const isLeaderClient = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeaderClient.success) {
                return createErrorResult("Bu işlemi yapmaya yetkiniz yok", isLeaderClient.ERR_CODE!);
            }

            const result = await CommunityRepository.promoteMember(communityName, memberId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);

        } catch (error) {
            return createErrorResult("Lider eklenirken bir hata oluştu", "SERVER_ERROR");
        }
    },
    demoteMember: async (communityName: string, clientId: string, memberId: string): Promise<IResult> => {
        try {

            const isUserMember = await CommunityRepository.isUserMember(communityName, memberId);
            if (!isUserMember.success) {
                return createErrorResult("Kullanıcı topluluğun üyesi değil", isUserMember.ERR_CODE!);
            }

            const isLeader = await CommunityRepository.isLeader(communityName, memberId);
            if (!isLeader.success) {
                return createErrorResult("Kullanıcı lider değil", "NOT_LEADER");
            }

            const isLeaderClient = await CommunityRepository.isLeader(communityName, clientId);
            if (!isLeaderClient.success) {
                return createErrorResult("Bu işlemi yapmaya yetkiniz yok", isLeaderClient.ERR_CODE!);
            }


            if (clientId === memberId) {
                return createErrorResult("Liderliği kendinizden alamazsınız", "SELF_DEMOTE");
            }

            const result = await CommunityRepository.demoteMember(communityName, memberId);

            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE!);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult("Liderlikten indirilirken bir hata oluştu", "SERVER_ERROR");
        }
    }
}
