import { UserRepository } from "./repository";
import { IUserService } from "./interfaces";
import { registerSchema } from "../validation";
import { createResult } from "@/src/utils/returnFunctions";
import { hashPassword,comparePassword } from "../utils/bcrypt";


export const UserService : IUserService = {
    createUser: async (data): Promise<Result<IUserBasicInfo|null>> => {
        try {
            const emailResult = await UserRepository.getUserByEmail(data.email);
            if (emailResult.success) {
                return createResult<null>(false, null, "Email already exists");
            }
            const hashedPassword = await hashPassword(data.password);
            const creationResult = await UserRepository.createUser(
                {
                    password: hashedPassword,
                    email: data.email,
                    name: data.name
                }
            );
            if (!creationResult.success) {
                return createResult<null>(false, null, creationResult.message);
            }
            return createResult<IUserBasicInfo>(true, creationResult.data );
        } catch (error) {
            console.error("Create User Error:", error);
            return createResult<null>(false, null, "Failed to create user");
        }
    },
    deleteUser: async (id: string): Promise<Result<null>> => {
        try {
            const result = await UserRepository.deleteUser(id);
            if (!result.success) {
                return createResult<null>(false, null, result.message);
            }
            return createResult<null>(true, null);

        } catch (error) {
            console.error("Delete User Error:", error);
            return createResult<null>(false, null, "Failed to delete user");
        }
    },
    getIUserBasicInfoById: async (id: string): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const result = await UserRepository.getIUserBasicInfoById(id);
            if (!result.success) {
                return createResult<IUserBasicInfo>(false, null, result.message);
            }
            return createResult<IUserBasicInfo>(true, result.data);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult<IUserBasicInfo>(false, null, "Failed to retrieve user information");
        }
    },
    getUserByEmail: async (email: string): Promise<Result<IUserBasicInfo | null>> => {
        try {
            const result = await UserRepository.getUserByEmail(email);
            if (!result.success) {
                return createResult<IUserBasicInfo>(false, null, "User not found");
            }
            return createResult<IUserBasicInfo>(true, result.data);
        } catch (error) {
            console.error("Get User Info Error:", error);
            return createResult<IUserBasicInfo>(false, null, "Failed to retrieve user information");
        }
    },
    checkUserPassword: async (data): Promise<Result<IUserBasicInfo|null>> => {
        try {
            const result = await UserRepository.getUserPassword(data.email);
            if (!result.success||!result.data) {
                return createResult<IUserBasicInfo>(false, null, result.message);
            }
            const isPasswordCorrect = await comparePassword(data.password, result.data);
            if (!isPasswordCorrect) {
                return createResult(false, null, "Password incorrect");
            }
            const userResult = await UserRepository.getUserByEmail(data.email);
            if (!userResult.success || !userResult.data) {
                return createResult(false, null, userResult.message);
            }
            return createResult<IUserBasicInfo>(true, userResult.data);
        } catch (error) {
            console.error("Check Password Error:", error);
            return createResult(false, null, "Failed to check password");
        }
     },
     updateUserName: async (id: string, name: string) : Promise<Result<null>>=>{
        try {
            const result = await UserRepository.updateUserName(id,name)
            if(!result.success){
                return createResult(false , null, result.message)
            }
            return createResult(true,null)
        } catch (error) {
            console.log("Update Username Error",error)
            return createResult(false, null, "Failed to update username")
        }
     },
     updateUserEmail: async (id: string, email :string ) : Promise<Result<null>>=>{
        try {
            const result = await UserRepository.updateUserEmail(id,email)
            if(!result.success){
                return createResult(false , null, result.message)
            }
            return createResult(true,null)
        } catch (error) {
            console.log("Update Username Error",error)
            return createResult(false, null, "Failed to update user email")
        }
     },
     updateUserRole: async (id: string, role: string) : Promise<Result<null>>=>{
        try {
            const result = await UserRepository.updateUserRole(id,role)
            if(!result.success){
                return createResult(false , null, result.message)
            }
            return createResult(true,null)
        } catch (error) {
            console.log("Update User Role Error",error)
            return createResult(false, null, "Failed to update user role")
        }
     }, 
     
}

