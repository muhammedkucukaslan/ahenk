import Navbar from '@/src/components/global/navbar';
import SideBar from '../../components/global/app-sidebar';
import { SidebarProvider } from '@/src/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBar />

      <main className='h-full overflow-y-auto overflow-x-hidden'>
        <Navbar />
        <div className='p-6'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
