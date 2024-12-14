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
  username: string,
  email: string,
  role: string
  bio: string | null,
  profilePic: string
  createdAt: Date
  ledCommunities: { id: string, name: string }[]
  communities: { id: string, name: string }[]
  posts: { id: string, title: string }[]
  comments: { id: string, content: string }[]
}

type ILimitedUserProfile = {
  id: string,
  username: string,
  profilePic: string,
  bio: string | null,
  communities: { id: string, name: string }[]
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