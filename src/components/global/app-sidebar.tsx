'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const topics = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
  },
  {
    id: '2',
    name: 'Vue',
    slug: 'vue',
  },
  {
    id: '3',
    name: 'Angular',
    slug: 'angular',
  },
  {
    id: '4',
    name: 'Svelte',
    slug: 'svelte',
  },
  {
    id: '5',
    name: 'Next.js',
    slug: 'nextjs',
  },
  {
    id: '6',
    name: 'Nuxt.js',
    slug: 'nuxtjs',
  },
  {
    id: '7',
    name: 'Gatsby',
    slug: 'gatsby',
  },
  {
    id: '8',
    name: 'Sapper',
    slug: 'sapper',
  },
  {
    id: '9',
    name: 'Blitz.js',
    slug: 'blitzjs',
  },
];

const communities = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
  },
  {
    id: '2',
    name: 'Vue',
    slug: 'vue',
  },
  {
    id: '3',
    name: 'Angular',
    slug: 'angular',
  },
  {
    id: '4',
    name: 'Svelte',
    slug: 'svelte',
  },
  {
    id: '5',
    name: 'Next.js',
    slug: 'nextjs',
  },
  {
    id: '6',
    name: 'Nuxt.js',
    slug: 'nuxtjs',
  },
  {
    id: '7',
    name: 'Gatsby',
    slug: 'gatsby',
  },
  {
    id: '8',
    name: 'Sapper',
    slug: 'sapper',
  },
  {
    id: '9',
    name: 'Blitz.js',
    slug: 'blitzjs',
  },
];

const SideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Başlıklar
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <ul className='flex flex-col gap-2 pl-2 mt-2'>
                {topics.map((topic) => (
                  <Link key={topic.id} href={topic.slug}>
                    <Button
                      className='w-full justify-start'
                      size={'sm'}
                      variant={'ghost'}
                    >
                      {topic.name}
                    </Button>
                  </Link>
                ))}
              </ul>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Topluluklar
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <ul className='flex flex-col gap-2 pl-2 mt-2'>
                {communities.map((community) => (
                  <Link key={community.id} href={community.slug}>
                    <Button
                      className='w-full justify-start'
                      size={'sm'}
                      variant={'ghost'}
                    >
                      {community.name}
                    </Button>
                  </Link>
                ))}
              </ul>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
