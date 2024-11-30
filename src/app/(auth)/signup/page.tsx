'use client';

import SignupFrom from '@/src/features/auth/forms/signup-form';
import { CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import React from 'react';
import Link from 'next/link';

const SignupPage = () => {
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
        <CardHeader className={'text-2xl font-semibold'}>
          Hoşgeldiniz
        </CardHeader>
        <CardContent>
          <SignupFrom />
        </CardContent>
        <CardFooter className='justify-center'>
          <p className='text-sm'>
            Hesabın var mı?{' '}
            <Link href='/login' className={'text-primary font-semibold'}>
              Giriş yap
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
};

export default SignupPage;
