import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { IUpdateExpenseStatusRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';
import { Prisma } from '@prisma/client';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { id, status }: IUpdateExpenseStatusRequestParams = body;

  const query = {
    where: {
      id: id,
    },
    data: {
      status: status,
    },
    select: {
      id: true,
      dueDate: true,
      value: true,
      description: true,
      type: true,
      paymentBarCode: true,
      observations: true,
      status: true,
      paymentList_id: true,
    },
  };

  try {
    const response = await prisma.expense.update(query);

    return NextResponse.json({ data: response, message: 'EXPENSE UPDATED.' }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('DEBUG_OUR-FINANCE <-----> error:', error);

      return NextResponse.json(
        { data: null, message: `Prisma error. Code: ${error.code}` },
        { status: 422 },
      );
    } else {
      return NextResponse.json(
        { data: null, message: 'EXPENSE NOT CREATED, SOMETHING WENT WRONG.' },
        { status: 500 },
      );
    }
  }
}
