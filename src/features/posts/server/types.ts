type IPost = {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        username: string;
    },
    comments: {
        id: string;
        content: string;
        author: {
            id: string;
            username: string;
        },
        createdAt: Date;
        children:{
            id: string;
            content: string;
            author: {
                id: string;
                username: string;
            },
            createdAt: Date;

        }[]

    }[];
    votes: number,
    createdAt: Date;
    updatedAt: Date;
}

type IPostCreation = {
    title: string;
    content: string;
    communityName: string;
    authorId: string;
}

type IPostCreationWithSlug = {
    title: string;
    slug: string
    content: string;
    communityName: string;
    authorId: string;
}