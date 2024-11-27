export type User = {
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

export type IUserBasicInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
};
