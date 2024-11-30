import * as yup from "yup";

const registerSchema  = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    surname : yup.string().required(),
    password: yup.string().required(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})


export { registerSchema, loginSchema };


