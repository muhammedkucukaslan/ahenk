'use client';

import Link from 'next/link';
import SideBar from './dashboard/sidebar/SideBar';
import { Button } from '@/src/components/ui/button';
import useSidebarStore from './dashboard/sidebar/SideBarStore';

export default function Home() {
  const { toggleIsSideBarOpen } = useSidebarStore();

  return (
    <div>
      <div className='flex flex-col items-center  '>
        <h1>My Homepage</h1>
        <p>Welcome to my homepage!</p>
        <Link href='login'>
          <button>Login </button>
        </Link>
        <Link href='signup'>
          <button>Go to Signup</button>
        </Link>
        <div>
          {/* sadece kucuk ekranlar icin */}
          <Button onClick={toggleIsSideBarOpen}>
            active side bar (sadece kucuk ekranlar icin )
          </Button>
        </div>
      </div>

      <SideBar />
    </div>
  );
}
