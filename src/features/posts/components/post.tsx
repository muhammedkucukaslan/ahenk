'use client';

import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import { Dot, MessageCircle, Share, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import CommentForm from '../forms/comment-form';

const Post = ({ body, createdAt, files, group, author }: Post) => {
  const [showCommentForm, setShowCommentForm] = React.useState(false);

  return (
    <Card>
      <CardHeader className='flex gap-1 items-center flex-row space-y-0 text-sm'>
        <p>{author}</p>/<p>{group}</p>
        <Dot />
        <p>{createdAt}</p>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter className='border-t grid grid-cols-3 py-2'>
        <Button variant={'ghost'}>
          <ThumbsUp />
        </Button>
        <Button onClick={() => setShowCommentForm(true)} variant={'ghost'}>
          <MessageCircle />
        </Button>
        <Button variant={'ghost'}>
          <Share />
        </Button>
      </CardFooter>

      {showCommentForm && <CommentForm />}
    </Card>
  );
};

export default Post;
