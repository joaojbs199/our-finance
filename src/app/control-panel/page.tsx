import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@/src/components/Navbar/component';
import { Metadata } from 'next';
import GetUserButton from '@/src/components/Buttons/GetOwnersButton';
import GetExpensesButton from '@/src/components/Buttons/GetExpensesButton';
import CreateExpenseButton from '@/src/components/Buttons/CreateExpenseButton';

export const metadata: Metadata = {
  title: 'Painel de controle',
};

export default async function ControlPanel() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <Navbar />
      <h1>Painel de controle</h1>
      <GetUserButton />
      <GetExpensesButton />
      <CreateExpenseButton />
    </div>
  );
}
