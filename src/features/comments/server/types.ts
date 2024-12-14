type ICommentCreation = {
    postSlug: string;
    content: string;
    authorId: string;
}
type IReplyCreation = {
    commentId: string;
    content: string;
    authorId: string;
}

type IComment = {
    id: string;
    content: string;
}