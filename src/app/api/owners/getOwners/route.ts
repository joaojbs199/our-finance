import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const query = {
    where: {
      user_email: session.user?.email as string,
    },
  };

  const data = await prisma.owner.findMany(query);

  return NextResponse.json({ data, message: 'FINDED USERS' }, { status: 200 });
}
