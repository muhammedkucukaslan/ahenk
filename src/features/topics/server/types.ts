type ITopic= {
    id: string
    title: string;
    content: string;
    slug: string;
    createdAt: Date;    
}

type ITopicProfile= {
    id: string
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    posts: {
        id: string ,
        title: string ,
        content: string ,
        createdAt: Date,
        community:{
            name: string
        }
    }[];
}

type ITopicCreation= {
    title: string;
    content: string;
}

type ITopicCreationWithSlug= {
    title: string;
    content: string;
    slug: string;
}