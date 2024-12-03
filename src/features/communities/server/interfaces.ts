import { createCommunitySchema } from '../validation';
import { InferType } from "yup";


interface ICommunityRepository {
    createCommunity: (data: InferType<typeof createCommunitySchema>) => Promise<Result<null>>;
    isCommunityPublic: (communityId: string) => Promise<Result<null>>;
    isUserMember: (communityId: string, clientId: string) => Promise<Result<null>>;
    getLimitedCommunityById: (communityId: string) => Promise<Result<ILimitedCommunityProfile | null>>;
    getCommunityById: (communityId: string) => Promise<Result<ICommunityProfile| null>>;
    // deleteCommunity: (id: string) => Promise<Result<null>>;
}

interface ICommunityService {
    createCommunity: (data: InferType<typeof createCommunitySchema>) => Promise<Result<null>>;
    checkCommunityPermission: (communityId: string, clientId: string) => Promise<Result<boolean>>;
    getLimitedCommunityById: (communityId: string) => Promise<Result<ILimitedCommunityProfile| null>>;
    getCommunityById: (communityId: string) => Promise<Result<ICommunityProfile| null>>;
    // deleteCommunity: (id: string) => Promise<Result<null>>;
}

export type {
    ICommunityRepository,
    ICommunityService
}
