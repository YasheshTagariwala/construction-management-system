import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter The password")
});
