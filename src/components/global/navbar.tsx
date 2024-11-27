'use client';

import Link from 'next/link';
import Search from './search';
import UserButton from './user-button';
import Notifications from './notifications';

const Navbar = () => {
  return (
    <nav className='flex absolute top-0 w-full h-[62px] px-4 border-b items-center justify-between'>
      <div className='flex gap-6 items-center'>
        <Link href={'/dashboard'}>
          <h4 className='text-2xl font-bold cursor-pointer'>Ahenk</h4>
        </Link>
        <Search />
      </div>

      <div className='flex items-center gap-3'>
        <Notifications />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
