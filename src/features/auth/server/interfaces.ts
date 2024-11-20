interface IAuthService {
    
    generateToken: (id : string, role: string) => Promise<Result<string|null>>;
    // register: (email: string, password: string) => Promise<Result<string|null>>;
    // logout: () => Promise<Result<null>>;

}

export type { IAuthService };