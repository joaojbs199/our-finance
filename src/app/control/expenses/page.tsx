import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';
import CreateExpenseButton from '@/src/components/Buttons/CreateExpenseButton';
import { ItemList } from '@/src/components/List/ItemList';

export const metadata: Metadata = {
  title: 'Despesas',
};

export default async function Expenses() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <ItemList />
    </div>
  );
}
