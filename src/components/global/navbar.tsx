'use client';

import Link from 'next/link';
import Search from './search';
import UserButton from './user-button';
import Notifications from './notifications';
import { SidebarTrigger } from '../ui/sidebar';

const Navbar = () => {
  return (
    <nav className='flex h-[62px] px-4 border-b items-center justify-between fixed left-0 right-0 top-0 z-50 bg-background'>
      <div className='flex gap-6 items-center'>
        <SidebarTrigger />
        <Link href={'/dashboard'}>
          <h4 className='text-2xl font-bold cursor-pointer'>Ahenk</h4>
        </Link>
      </div>

      <Search />

      <div className='flex items-center gap-3'>
        <Notifications />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
