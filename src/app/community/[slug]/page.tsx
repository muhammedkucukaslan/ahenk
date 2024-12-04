import { Button } from '@/src/components/ui/button';
import PostsContainer from '@/src/features/posts/components/post-container';
import { Plus } from 'lucide-react';
import React from 'react';
import { Post } from '../../page';
import CommunityInfo from '@/src/features/communities/components/community-info';

const mockPosts = [
  {
    author: 'Ahmet Yılmaz',
    body: 'Modern web uygulamalarında performans optimizasyonu kritik öneme sahiptir. Bu yazıda React uygulamalarında kullanabileceğiniz temel optimizasyon tekniklerini ele alacağız.',
    group: 'frontend',
    createdAt: '2024-03-30T10:00:00Z',
    files: ['performance-metrics.png', 'optimization-chart.svg'],
  },
  {
    author: 'Ahmet Yılmaz',
    body: 'Modern web uygulamalarında performans optimizasyonu kritik öneme sahiptir. Bu yazıda React uygulamalarında kullanabileceğiniz temel optimizasyon tekniklerini ele alacağız.',
    group: 'frontend',
    createdAt: '2024-03-30T10:00:00Z',
    files: ['performance-metrics.png', 'optimization-chart.svg'],
  },
  {
    author: 'Ahmet Yılmaz',
    body: 'Modern web uygulamalarında performans optimizasyonu kritik öneme sahiptir. Bu yazıda React uygulamalarında kullanabileceğiniz temel optimizasyon tekniklerini ele alacağız.',
    group: 'frontend',
    createdAt: '2024-03-30T10:00:00Z',
    files: ['performance-metrics.png', 'optimization-chart.svg'],
  },
];

export type CommunityType = {
  name: string;
  description: string;
  slug: string;
  members: number;
  createdAt: string;
  cover: string;
  profile: string;
  posts: Post[];
  isPublic: boolean;
};

const CommunityPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const communityName = (await params).slug;

  const community = {
    name: 'Community Name',
    description:
      'Modern web uygulamalarında performans optimizasyonu kritik öneme sahiptir. Bu yazıda React uygulamalarında kullanabileceğiniz temel optimizasyon tekniklerini ele alacağız.',
    slug: communityName,
    members: 300,
    createdAt: '2024-03-30T10:00:00Z',
    cover: 'https://via.placeholder.com/1200x300',
    profile: 'https://via.placeholder.com/120x120',
    posts: mockPosts,
    isPublic: true,
  };

  return (
    <main className='flex flex-col w-full'>
      {/* Community Cover */}
      <div className='relative'>
        <div className='bg-slate-300 w-full h-36 rounded-lg' />
        <div className='flex -mt-16 px-6 items-center w-full justify-between'>
          <div className='flex items-center gap-4'>
            <div className='rounded-full w-[120px] h-[120px] bg-primary border-4' />
            <h1 className='text-2xl font-bold mt-16'>Community Name</h1>
          </div>

          <div className='flex gap-4 mt-16'>
            <Button variant={'outline'}>
              <Plus size={16} />
              Paylaşım yap
            </Button>
            <Button>Katıl</Button>
          </div>
        </div>
      </div>

      {/* Community Content */}
      <aside className='flex gap-4 mt-10'>
        <PostsContainer posts={mockPosts} />
        <CommunityInfo community={community} />
      </aside>
    </main>
  );
};

export default CommunityPage;
