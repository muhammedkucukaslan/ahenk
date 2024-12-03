import { Card } from '@/src/components/ui/card';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-full w-full flex items-center justify-center'>
      <Card className='border-none md:border w-full max-w-lg'>{children}</Card>
    </main>
  );
};

export default AuthLayout;
