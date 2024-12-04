import React from 'react';
import Post from './post';
import { Post as PostType } from '@/src/app/page';

type PostContainerProps = {
  posts: PostType[];
};

const PostsContainer = ({ posts }: PostContainerProps) => {
  return (
    <div className='flex flex-col gap-4 flex-1 min-w-0'>
      {posts.map((post) => (
        <Post key={post.createdAt} {...post} />
      ))}
    </div>
  );
};

export default PostsContainer;
