import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { ICreateExpenseRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { expense, ownerId }: ICreateExpenseRequestParams = body;

  const query = {
    data: {
      ...expense,
      owners: {
        connect: {
          id: ownerId,
        },
      },
    },
  };

  try {
    await prisma.expense.create(query);

    return NextResponse.json({ data: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { data: false, message: 'EXPENSE NOT CREATED, SOMETHING WENT WRONG.' },
      { status: 422 },
    );
  }
}
