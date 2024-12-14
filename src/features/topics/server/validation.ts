import * as yup from 'yup';

const createTopicSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
});

export { createTopicSchema };