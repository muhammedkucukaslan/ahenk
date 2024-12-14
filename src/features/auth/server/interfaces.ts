interface IAuthService {
    generateToken: (id: string, role: string) => Promise<IResult<string>>;
}

export type { IAuthService };