import * as yup from 'yup';

export const postSchema = yup.object({
    authorId: yup.string().required(),
    title: yup.string().required(),
    body: yup.string().required(),
    communityName: yup.string().required()
});