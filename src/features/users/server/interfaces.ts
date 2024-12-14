import { InferType } from "yup";
import { registerSchema, loginSchema } from "./validation";
interface IUserRepository {
    createUser: (data: InferType<typeof registerSchema>) => Promise<IResult<{ id: string, role: string }>>;
    deleteUser: (id: string) => Promise<IResult>;
    getCurrent: (id: string) => Promise<IResult<IUserProfile>>
    getUserByUsername: (name: string) => Promise<IResult<ILimitedUserProfile>>
    isEmailValid: (email: string) => Promise<IResult>;
    isUsernameValid: (username: string) => Promise<IResult>;
    getUserPasswordAndTokenInfos: (email: string) => Promise<IResult<{ id: string, password: string, role: string }>>;
    // updateUserName: (id: string, name: string) => Promise<IResult>;
    // updateUserEmail: (id: string, email: string) => Promise<IResult>;
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>>;
}

interface IUserService {
    createUser: (data: InferType<typeof registerSchema>) => Promise<IResult<{ id: string, role: string }>>;
    checkUserPasswordAndGetTokenInfos: (data: InferType<typeof loginSchema>) => Promise<IResult<{ id: string, role: string }>>;
    getUserByUsername: (name: string) => Promise<IResult<ILimitedUserProfile>>;
    deleteUser: (id: string) => Promise<IResult>;
    getCurrentUser: (id: string) => Promise<IResult<IUserProfile>>;
    // updateUserName: (id: string, name: string) => Promise<IResult>;
    // updateUserEmail: (id: string, email: string) => Promise<IResult>;
}

export type { IUserRepository, IUserService };