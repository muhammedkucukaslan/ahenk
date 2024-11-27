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

type Result<T> = {
  success: boolean;
  data: T | null;
  message?: string;
};

type ResultResponse<T> = NextResponse<Result<T>>;
