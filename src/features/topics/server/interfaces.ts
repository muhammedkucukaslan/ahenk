interface ITopicRepository {
    isTopicExist: (title: string) => Promise<IResult>;
    createTopic: (data: ITopicCreationWithSlug) => Promise<IResult>;
    getTopics: () => Promise<IResult<ITopic[]>>;
    getTopicBySlug: (slug: string) => Promise<IResult<ITopicProfile>>;
    updateTopicBySlug: (slug: string, data: ITopicCreationWithSlug) => Promise<IResult>;
    deleteTopicBySlug: (slug: string) => Promise<IResult>;
}


interface ITopicService {
    createTopic: (data: ITopicCreation) => Promise<IResult>;
    getTopics: () => Promise<IResult<ITopic[]>>;
    getTopicBySlug: (slug: string) => Promise<IResult<ITopicProfile>>;
    updateTopicBySlug: (slug: string, data: ITopicCreation) => Promise<IResult>;
    deleteTopicBySlug: (slug: string) => Promise<IResult>;
}

export type { ITopicRepository, ITopicService };