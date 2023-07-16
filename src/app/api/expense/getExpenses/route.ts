import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { DateHandler } from '@/src/utils/DateHandler';
import isEmpty from 'is-empty';
import { ExpenseType } from '@prisma/client';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { initialDate, finalDate, ownerIds, type } = body;

  const hasSharedType = !isEmpty(type) && type.includes(ExpenseType.SHARED);

  const createExpensesDateRange = () => {
    const { year, month } = DateHandler.getYearMonth();
    const day = DateHandler.getMonthLength(year, month);

    const initialDate = `${year}-0${month}-01`;
    const finalDate = `${year}-0${month}-${day}`;

    return {
      initialDate,
      finalDate,
    };
  };

  const expenseDateRange =
    !isEmpty(initialDate) && !isEmpty(finalDate)
      ? { initialDate, finalDate }
      : createExpensesDateRange();

  const query = {
    where: {
      AND: [
        {
          dueDate: {
            gte: new Date(expenseDateRange.initialDate),
            lte: new Date(expenseDateRange.finalDate),
          },
        },
        {
          owners: {
            every: {
              user_email: session.user?.email as string,
              id: {
                ...(!hasSharedType && {
                  in: ownerIds,
                }),
              },
            },
          },
        },
        {
          type: {
            ...(!isEmpty(ownerIds) && ownerIds.length > 1 && !hasSharedType
              ? {
                  in: ['INDIVIDUAL'],
                }
              : {
                  in: type,
                }),
          },
        },
      ],
    },
  };

  const data = await prisma.expense.findMany(query);

  return NextResponse.json({ length: data.length, data }, { status: 200 });
}
