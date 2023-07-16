import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { DateHandler } from '@/src/utils/DateHandler';
import isEmpty from 'is-empty';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { initialDate, finalDate } = body;

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
            },
          },
        },
      ],
    },
  };

  const data = await prisma.expense.findMany(query);

  return NextResponse.json({ length: data.length, data }, { status: 200 });
}
