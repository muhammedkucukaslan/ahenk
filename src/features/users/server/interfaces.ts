import { User, Group } from "@prisma/client";
import { InferType } from "yup";
import { registerSchema, loginSchema } from "../validation";
interface IUserRepository {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<IUserBasicInfo | null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getIUserBasicInfoById: (id: string) => Promise<Result<IUserBasicInfo | null>>;
    getUserByEmail: (email: string) => Promise<Result<IUserBasicInfo | null>>;
    getUserPassword: (email: string) => Promise<Result<string|null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
    updateUserRole: (id: string, role: string) => Promise<Result<null>>;
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>>;
}

interface IUserService {
    createUser: (data: InferType<typeof registerSchema>) => Promise<Result<IUserBasicInfo | null>>;
    deleteUser: (id: string) => Promise<Result<null>>;
    getIUserBasicInfoById: (id: string) => Promise<Result<IUserBasicInfo | null>>;
    getUserByEmail: (email: string) => Promise<Result<IUserBasicInfo | null>>;
    checkUserPassword: (data: InferType<typeof loginSchema>) => Promise<Result<IUserBasicInfo | null>>;
    updateUserName: (id: string, name: string) => Promise<Result<null>>;
    updateUserEmail: (id: string, email: string) => Promise<Result<null>>;
    updateUserRole: (id: string, role: string) => Promise<Result<null>>; 
    // getUserByIdWithGroups: (id: string) => Promise<Result<IUserBasicInfo & { groups: Group[] }>;

}

export type { IUserRepository, IUserService };