import { createCommunitySchema } from '../validation';
import { InferType } from "yup";


interface ICommunityRepository {
    getCommunities: () => Promise<IResult<ICommunity[]>>;
    createCommunity: (data: InferType<typeof createCommunitySchema>) => Promise<IResult>;
    updateCommunity: (communityName: string, updateData: ICommunityUpdation) => Promise<IResult>;
    updateCommunityName: (communityName: string, name: string) => Promise<IResult>;
    updateCommunityDescription: (communityName: string, description: string) => Promise<IResult>;
    updateCommunityIsPublic: (communityName: string, isPublic: boolean) => Promise<IResult>;
    isNameExist: (name: string) => Promise<IResult>;
    isCommunityExist: (communityName: string) => Promise<IResult>;
    isCommunityPublic: (communityName: string) => Promise<IResult>;
    isUserMember: (communityName: string, clientId: string) => Promise<IResult>;
    isLeader: (communityName: string, clientId: string) => Promise<IResult>;
    getCommunityByName: (communityName: string) => Promise<IResult<ICommunityProfile>>;
    getLimitedCommunityByName: (communityName: string) => Promise<IResult<ICommunityProfile>>;
    getMembers: (communityName: string) => Promise<IResult<ICommunityMember[]>>
    joinCommunity: (communityName: string, clientId: string) => Promise<IResult>;
    addMember: (communityName: string, memberId: string) => Promise<IResult>;
    removeMember: (communityName: string, memberId: string) => Promise<IResult>;
    promoteMember: (communityName: string, memberId: string) => Promise<IResult>;
    demoteMember: (communityName: string, memberId: string) => Promise<IResult>;
    // deleteCommunity: (id: string) => Promise<IResult>;
}

interface ICommunityService {
    getCommunities: () => Promise<IResult<ICommunity[]>>;
    createCommunity: (data: InferType<typeof createCommunitySchema>) => Promise<IResult>;
    updateCommunity: (communityName: string, cliendId: string, updateData: ICommunityUpdation) => Promise<IResult>;
    updatePartialPartOfCommunity: (communityName: string, cliendId: string, updateField: any, field: string) => Promise<IResult>;
    getCommunityByName: (communityName: string, clientId?: string) => Promise<IResult<ICommunityProfile>>;
    getMembers: (communityName: string, clientId?: string) => Promise<IResult<ICommunityMember[]>>;
    joinCommunity: (communityName: string, clientId: string) => Promise<IResult>;
    addMember: (communityName: string, clientId: string, memberId: string) => Promise<IResult>;
    removeMember: (communityName: string, clientId: string, memberId: string) => Promise<IResult>;
    promoteMember: (communityName: string, clientId: string, memberId: string) => Promise<IResult>;
    demoteMember: (communityName: string, clientId: string, memberId: string) => Promise<IResult>;
    // deleteCommunity: (id: string) => Promise<IResult>;
}

export type {
    ICommunityRepository,
    ICommunityService
}
