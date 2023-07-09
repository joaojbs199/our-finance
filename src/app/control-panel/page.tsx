import { getServerSession } from 'next-auth';
import { authOptions } from '@src/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Navbar } from '@src/components/Navbar/component';
import { Metadata } from 'next';

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
    </div>
  );
}
