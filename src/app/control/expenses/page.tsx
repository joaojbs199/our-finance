import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';
import CreateExpenseButton from '@/src/components/Buttons/CreateExpenseButton';
import { ExpenseList } from '@/src/components/Expenses/ExpenseList';
import { Loader } from '@/src/components/Loader/Loader';

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
      <Loader />
      <Navbar />
      <ExpenseList />
    </div>
  );
}
