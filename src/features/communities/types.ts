type ILimitedCommunityProfile = {
    id: string;
    name: string;
    isPublic: boolean;
    description: string | null;
    leaders: { id: string, name: string }[];
    membersCount: number;
    createdAt: Date;
}

type ICommunityProfile = {
    communityInfos: ILimitedCommunityProfile,
    members: { id: string, name: string, surname: string }[];
    topics: { id: string, title: string }[];
}