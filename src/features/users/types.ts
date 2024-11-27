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


type IUserBasicInfo ={
    id : string
    name : string
    surname: string
    email : string
    role : string
}