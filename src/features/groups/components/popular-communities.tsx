'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Link from 'next/link';
import React from 'react';

const mockData = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    members: 300,
  },
  {
    id: '2',
    name: 'Vue',
    slug: 'vue',
    members: 300,
  },
  {
    id: '3',
    name: 'Angular',
    slug: 'angular',
    members: 300,
  },
  {
    id: '4',
    name: 'Svelte',
    slug: 'svelte',
    members: 300,
  },
  {
    id: '5',
    name: 'Next.js',
    slug: 'nextjs',
    members: 300,
  },
  {
    id: '6',
    name: 'Nuxt.js',
    slug: 'nuxtjs',
    members: 300,
  },
  {
    id: '7',
    name: 'Gatsby',
    slug: 'gatsby',
    members: 300,
  },
  {
    id: '8',
    name: 'Sapper',
    slug: 'sapper',
    members: 300,
  },
  {
    id: '9',
    name: 'Blitz.js',
    slug: 'blitzjs',
    members: 300,
  },
];

const PopularCommunities = () => {
  return (
    <div className='hidden lg:block w-[300px]'>
      <Card className='sticky top-[84px]'>
        <CardHeader>
          <CardTitle>Popüler Topluluklar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            {mockData.map((community) => (
              <Link
                href={community.slug}
                key={community.id}
                className='flex items-center gap-2 rounded-lg hover:bg-secondary px-3 py-2'
              >
                <div className='w-8 h-8 bg-gray-200 rounded-full' />
                <div className='flex flex-col gap-1'>
                  <p>{community.name}</p>
                  <p className='text-muted-foreground'>{community.members}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularCommunities;
