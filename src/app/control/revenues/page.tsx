import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';
import { Loader } from '@/src/components/Loader/component';
import { RevenueList } from '@/src/components/Revenues/RevenueList/component';
import { RenderUpdateRevenue } from '@/src/components/Revenues/UpdateRevenue/component';

export const metadata: Metadata = {
  title: 'Receitas',
};

export default async function Revenues() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen flex-col">
      <Loader />
      <RenderUpdateRevenue />
      <Navbar />
      <RevenueList />
    </div>
  );
}
