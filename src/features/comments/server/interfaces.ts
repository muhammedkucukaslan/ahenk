
interface ICommentRepository {
    createComment: (data: ICommentCreation) => Promise<IResult>;
    createReply: (data: IReplyCreation) => Promise<IResult>;
    updateComment: (content: string, id: string) => Promise<IResult>;
    deleteComment: (id: string) => Promise<IResult>;
}

interface ICommentService {
    createComment: (data: ICommentCreation) => Promise<IResult>;
    createReply : (data: IReplyCreation) => Promise<IResult>;
    updateComment: (content: string, id: string) => Promise<IResult>;
    deleteComment: (id: string) => Promise<IResult>;
}