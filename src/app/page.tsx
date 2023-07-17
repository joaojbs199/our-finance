import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { Navbar } from '@/src/components/Navbar/component';

export const metadata: Metadata = {
  title: 'Our finance',
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/control/expenses');
  }
  return (
    <div>
      <Navbar />
      <h1>Hello world!</h1>
    </div>
  );
}
