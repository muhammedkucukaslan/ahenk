
interface IVoteRepository {
    votePost(slug: string, authorId: string, value: number): Promise<IResult>;
    voteComment(id: string, authorId: string, value: number): Promise<IResult>;
}

interface IVoteService {
    votePost(slug: string, authorId: string, value: number): Promise<IResult>;
    voteComment(id: string, authorId: string, value: number): Promise<IResult>;
}