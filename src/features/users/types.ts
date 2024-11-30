type User = {
  email: string;
  name: string;
  surname: string;
  password: string;
  id: string;
  profilePic: string;
  bio: string | null;
  role: Role;
  createdAt: Date;
}

type IUserProfile = {
  id: string,
  name: string,
  surname: string
  email: string,
  role: string
  bio: string | null,
  profilePic: string
  ledCommunities: { id: string, name: string }[]
  communities: { id: string, name: string }[]
  questions: { id: string, title: string }[]
  posts: { id: string, title: string }[]
}


type IUserBasicInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
};

enum Role {
  USER,
  ADMIN,
  MODERATOR
}