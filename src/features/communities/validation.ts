import * as yup from 'yup';

export const createCommunitySchema = yup.object().shape({
    name: yup.string().required().lowercase().test('is-single-word', 'Topluluk isminde boşluk olamaz', (value: any) => {
        return value && !/\s/.test(value);  
    }),
    leaderId: yup.string().required(),
    isPublic: yup.boolean().required(),
    description : yup.string().notRequired(),
    topics: yup.array(yup.string()).required()
});