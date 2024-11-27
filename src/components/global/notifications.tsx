import { Bell } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';

const Notification = () => {
  return (
    <div className='flex items-center justify-between border-b py-3'>
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10 bg-secondary rounded-full'></div>
        <div>
          <p className='text-sm font-semibold'>notification</p>
          <p className='text-xs text-muted-foreground'>
            Lorem ipsum dolor sit amet
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <div className='w-2 h-2 bg-primary rounded-full'></div>
        <p className='text-xs text-muted-foreground'>3 gün</p>
      </div>
    </div>
  );
};

const NotificationsSheet = () => {
  return (
    <SheetContent>
      <SheetHeader className='font-semibold text-xl mb-4'>
        Bildirimler
      </SheetHeader>
      <div className='flex flex-col gap-4'>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </SheetContent>
  );
};

const Notifications = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={'outline'}
          className='h-10 w-10 rounded-full border flex items-center justify-center'
        >
          <Bell size={18} />
        </Button>
      </SheetTrigger>
      <NotificationsSheet />
    </Sheet>
  );
};

export default Notifications;
