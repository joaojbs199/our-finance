import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { expenses } = body;

  const data = await prisma.expense.createMany({
    data: expenses,
  });

  if (data.count > 0) {
    return NextResponse.json({ message: 'EXPENSE CREATED.' }, { status: 201 });
  } else {
    return NextResponse.json({ message: 'EXPENSE NOT CREATED.' }, { status: 422 });
  }
}
