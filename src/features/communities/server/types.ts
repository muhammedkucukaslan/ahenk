type ICommunityProfile = {
    id: string;
    name: string;
    isPublic: boolean;
    description: string | null;
    leaders: { id: string, username: string }[];
    members: { id: string, username: string }[];
    posts: { id: string, title: string }[];
    createdAt: Date;
}

type ICommunity = {
    id: string,
    name: string,
    description: string|null,
    isPublic: boolean
    createdAt: Date
    membersCount : number 
}

type ICommunityMember = {
    id: string;
    username: string;
    createdAt: Date;
    profilePic: string 
}

type ICommunityUpdation = {
    name: string;
    isPublic: boolean;
    description: string;
}

