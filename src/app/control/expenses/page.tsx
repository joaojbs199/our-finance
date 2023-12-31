import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';
import { ExpenseList } from '@/src/components/Expenses/ExpenseList/component';
import { Loader } from '@/src/components/Loader/component';
import { RenderUpdateExpense } from '@/src/components/Expenses/UpdateExpense/component';
import { RenderCreateExpense } from '@/src/components/Expenses/CreateExpense/component';
import { RenderDeleteExpense } from '@/src/components/Expenses/DeleteExpense/component';

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
      <RenderCreateExpense />
      <RenderUpdateExpense />
      <RenderDeleteExpense />
      <Navbar />
      <ExpenseList />
    </div>
  );
}
