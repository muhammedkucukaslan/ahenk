import { User, Group } from "@prisma/client";
import { InferType } from "yup";
import { registerSchema, loginSchema } from "../validation";
interface IUserRepository {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<IUserBasicInfo | null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getIUserBasicInfoById: (id: string) => Promise<Result<{
        id: string,
        name: string,
        surname: string, 
        email: string,
        role: string
        bio: string|null,
        profilePic: string
        ledGroups: { id: string, name: string }[]
        groups: { id: string, name: string }[]
        projects: { id: string, name: string }[]
    } | null>>
    getUserByEmail: (email: string) => Promise<Result<IUserBasicInfo | null>>;
    getUserPasswordAndTokenInfos: (email: string) => Promise<Result<{ id: string, password: string, role: string } | null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
    updateUserRole: (id: string, role: string) => Promise<Result<null>>;
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>>;
}

interface IUserService {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<IUserBasicInfo | null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getUser: (id: string) => Promise<Result<{
        id: string,
        name: string,
        surname: string
        email: string,
        role: string
        bio: string|null,
        profilePic: string
        ledGroups: { id: string, name: string }[]
        groups: { id: string, name: string }[]
        projects: { id: string, name: string }[]
    } | null>>;
    getUserByEmail: (email: string) => Promise<Result<IUserBasicInfo | null>>;
    checkUserPasswordAndGetTokenInfos: (data: InferType<typeof loginSchema>) => Promise<Result<{ id: string, role: string}|null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
    updateUserRole: (id: string, role: string) => Promise<Result<null>>;
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>;

}

export type { IUserRepository, IUserService };