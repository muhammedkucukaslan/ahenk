import * as yup from 'yup';

export const createCommunitySchema = yup.object().shape({
    name: yup.string().required(),
    leaderId: yup.string().required(),
    isPublic: yup.boolean().required(),
    description : yup.string().notRequired()
});