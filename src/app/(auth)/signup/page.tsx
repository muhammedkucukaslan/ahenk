'use client';

import SignupFrom from '@/src/features/auth/forms/signup-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import React from 'react';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <Card>
      <CardHeader className={'text-2xl font-semibold'}>Hoşgeldiniz</CardHeader>
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
    </Card>
  );
};

export default SignupPage;
