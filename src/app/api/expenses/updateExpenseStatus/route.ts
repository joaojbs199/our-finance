import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { IUpdateExpenseStatusRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';
import { isValid } from '@/src/utils/validators';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  /* if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  } */

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

    const updated = isValid(response);

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    const err = error as any;
    const errorCause = err.meta.cause;

    if (errorCause === 'Record to update not found.') {
      return NextResponse.json({ data: false, message: errorCause }, { status: 404 });
    }

    console.log('DEBUG_OUR-FINANCE <-----> error:', err);
    return NextResponse.json(
      { data: false, message: 'EXPENSE NOT UPDATED, SOMETHING WENT WRONG.' },
      { status: 422 },
    );
  }
}
