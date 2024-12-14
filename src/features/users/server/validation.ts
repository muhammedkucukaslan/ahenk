import * as yup from "yup";

const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required().lowercase().test('is-single-word', 'Kullanıcı isminde boşluk olamaz', (value: any) => {
        return value && !/\s/.test(value);
    }),
    password: yup.string().required(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})


export { registerSchema, loginSchema };


