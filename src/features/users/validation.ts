import * as yup from "yup";

const registerSchema  = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

const IUserBasicInfoSchema  = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
})


export { registerSchema, loginSchema, IUserBasicInfoSchema };


