interface IAuthService {
    generateToken: (id: string, role: string) => Promise<Result<string | null>>;
}

export type { IAuthService };