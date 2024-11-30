import { User } from "@prisma/client";
import { InferType } from "yup";
import { registerSchema, loginSchema } from "../validation";
interface IUserRepository {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<{id: string , role : string} | null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getIUserBasicInfoById: (id: string) => Promise<Result< IUserProfile| null>>
    isEmailValid: (email: string) => Promise<Result<null>>;
    getUserPasswordAndTokenInfos: (email: string) => Promise<Result<{ id: string, password: string, role: string } | null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>>;
}

interface IUserService {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<{
        id : string,
        role: string,
    } | null>>;
    checkUserPasswordAndGetTokenInfos: (data: InferType<typeof loginSchema>) => Promise<Result<{ id: string, role: string}|null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getUser: (id: string) => Promise<Result<IUserProfile| null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
}

export type { IUserRepository, IUserService };