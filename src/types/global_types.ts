type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    groups: Group[];
    projects: Project[];
    ledGroups: Group[];
    ledProjects: Project[];
    friends: User[];
    friendsOf: User[];
};

type Group = {
    id: string;
    name: string;
    members: User[];
    projects: Project[];
    leader: User;
    leaderId: string;
};

type Project = {
    id: string;
    name: string;
    members: User[];
    group: Group;
    groupId: string;
    leader: User;
    leaderId: string;
};