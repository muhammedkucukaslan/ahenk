import { CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import LoginForm from '@/src/features/auth/forms/login-form';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div
      className={`flex flex-col min-h-screen justify-center 
      sm:items-center`}
    >
      <div
        className={`flex flex-col justify-center sm:rounded-lg sm:border sm:shadow-lg
        sm:w-96 sm:
       `}
      >
        <CardHeader className={'text-2xl font-semibold'}>Giriş Yap</CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm'>
            Hesabın yok mu?{' '}
            <Link href='/signup' className={'text-primary font-semibold'}>
              Kayıt ol
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
};

export default Login;
