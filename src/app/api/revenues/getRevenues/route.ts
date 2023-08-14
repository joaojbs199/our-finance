import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { DateHandler } from '@/src/utils/DateHandler';
import isEmpty from 'is-empty';
import { Prisma } from '@prisma/client';
import { IGetRevenueApiResponse } from '@/src/integration/data/models/apiResponse/revenues/interfaces';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'YOU MUST BE LOGGED IN.' }, { status: 401 });
  }

  const body = await request.json();
  const { initialDate, finalDate, ownerId, type } = body;

  const createRevenuesDateRange = () => {
    const { year, month } = DateHandler.getYearMonth();
    const day = DateHandler.getMonthLength(year, month);

    const initialDate = `${year}-0${month}-01`;
    const finalDate = `${year}-0${month}-${day}`;

    return {
      initialDate,
      finalDate,
    };
  };

  const revenueDateRange =
    !isEmpty(initialDate) && !isEmpty(finalDate)
      ? { initialDate, finalDate }
      : createRevenuesDateRange();

  const query = {
    where: {
      AND: [
        {
          date: {
            gte: new Date(revenueDateRange.initialDate),
            lte: new Date(revenueDateRange.finalDate),
          },
        },
        {
          owner: {
            user_email: 'joaojbs199@gmail.com',
            id: ownerId,
          },
        },
        {
          type: {
            in: type,
          },
        },
      ],
    },
    orderBy: {
      // eslint-disable-next-line prettier/prettier
      date: 'asc' as "asc",
    },
    select: {
      id: true,
      date: true,
      value: true,
      description: true,
      type: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };

  try {
    const data = await prisma.revenue.findMany(query);

    const response: IGetRevenueApiResponse = {
      metadata: {
        totalResults: data.length,
      },
      data: data,
    };

    return NextResponse.json({ data: response, message: 'FINDED REVENUES.' }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('DEBUG_OUR-FINANCE <-----> error:', error);

      return NextResponse.json(
        { data: null, message: `Prisma error. Code: ${error.code}` },
        { status: 422 },
      );
    } else {
      return NextResponse.json(
        { data: null, message: 'REVENUE NOT FINDED, SOMETHING WENT WRONG.' },
        { status: 500 },
      );
    }
  }
}
