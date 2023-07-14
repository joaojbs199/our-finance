import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/src/database/entities/user/helpers';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const users = await getUsers();

  return NextResponse.json({ data: users }, { status: 200 });
}
