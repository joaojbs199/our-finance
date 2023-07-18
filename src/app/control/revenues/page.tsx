import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receitas',
};

export default async function Revenues() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <Navbar />
      <h1>Página de receitas</h1>
    </div>
  );
}
