
interface IPostRepository {
    createPost: (data: IPostCreationWithSlug) => Promise<IResult>;
    getPostBySlug: (slug: string) => Promise<IResult<IPost>>;
    updatePost: (content: string, slug: string) => Promise<IResult>;
    deletePost: (slug: string) => Promise<IResult>;
}

interface IPostService {
    createPost: (data: IPostCreation) => Promise<IResult>;
    getPostBySlug: (slug: string) => Promise<IResult<IPost>>;
    updatePost: (content: string, slug: string) => Promise<IResult>;
    deletePost: (slug: string) => Promise<IResult>;
}