import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { IRemoveExpenseParams } from '@/src/integration/data/models/requestParams/expense/interfaces';
import { Prisma } from '@prisma/client';

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const removeExpenseParams: IRemoveExpenseParams = body;

  const { id } = removeExpenseParams;

  try {
    await prisma.$transaction([
      prisma.expense.update({
        where: {
          id: id,
        },
        data: {
          owners: {
            set: [],
          },
        },
      }),
      prisma.expense.delete({
        where: {
          id: id,
        },
      }),
    ]);

    return NextResponse.json({ data: true, message: 'EXPENSE REMOVED.' }, { status: 202 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('DEBUG_OUR-FINANCE <-----> error:', error);

      return NextResponse.json(
        { data: null, message: `Prisma error. Code: ${error.code}` },
        { status: 422 },
      );
    } else {
      return NextResponse.json(
        { data: null, message: 'EXPENSE NOT REMOVED, SOMETHING WENT WRONG.' },
        { status: 500 },
      );
    }
  }
}
