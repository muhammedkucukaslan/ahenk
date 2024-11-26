import Navbar from '@/src/components/global/navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-screen w-full'>
      <Navbar />
      {children}
    </main>
  );
}
