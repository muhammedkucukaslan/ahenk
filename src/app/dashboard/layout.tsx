import Navbar from '@/src/components/global/navbar';
import SideBar from './sidebar/SideBar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-screen w-full'>
      <Navbar />
      <div className='flex h-full pt-[62px]'>
        <SideBar />
        <main className='flex-1 p-6 h-full overflow-y-auto overflow-x-hidden'>
          {children}
        </main>
      </div>
    </main>
  );
}
