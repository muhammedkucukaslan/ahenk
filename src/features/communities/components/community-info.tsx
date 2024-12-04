import { CommunityType } from '@/src/app/community/[slug]/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import React from 'react';
import moment from 'moment';

type Props = {
  community: CommunityType;
};

const CommunityInfo = ({ community }: Props) => {
  return (
    <div className='hidden md:block w-[300px]'>
      <Card className='sticky top-[84px]'>
        <CardHeader>
          <CardTitle>{community.name}</CardTitle>
          <CardDescription>{community.description}</CardDescription>
        </CardHeader>
        <CardContent className='text-sm flex flex-col gap-1'>
          <div className='flex justify-between'>
            <p>Üyeler</p>
            <p>{community.members}</p>
          </div>
          <div className='flex justify-between'>
            <p>Oluşturulma</p>
            <p>{moment(community.createdAt).format('DD MMMM YYYY')}</p>
          </div>
          <div className='flex justify-between'>
            <p>Postlar</p>
            <p>{community.posts.length}</p>
          </div>
          <div className='flex justify-between'>
            <p>{community.isPublic ? 'Herkese Açık' : 'Özel'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityInfo;
