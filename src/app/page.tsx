import FeedContainer from '../features/posts/components/feed-container';
import PopularCommunities from '../features/groups/components/popular-communities';

export default function Home() {
  return (
    <>
      <FeedContainer />
      <PopularCommunities />
    </>
  );
}
