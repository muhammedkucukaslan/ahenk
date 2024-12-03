import PopularCommunities from '@/src/features/groups/components/popular-communities';
import FeedContainer from '@/src/features/posts/components/feed-container';

export default function Home() {
  return (
    <main className='container mx-auto flex gap-8 px-1 md:px-4 pt-[84px]'>
      <FeedContainer />
      <PopularCommunities />
    </main>
  );
}
