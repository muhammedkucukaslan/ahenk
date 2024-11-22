import { CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import LoginForm from '@/src/features/auth/forms/login-form';
import React from 'react';

const Login = () => {
  return (
    <>
      <CardHeader>Login</CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p>
          Hesabın yok mu?{' '}
          <a href='/signup' className='text-primary'>
            Kayıt ol
          </a>
        </p>
      </CardFooter>
    </>
  );
};

export default Login;
