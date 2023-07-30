import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { DateHandler } from '@/src/utils/DateHandler';
import isEmpty from 'is-empty';
import { ExpenseType, Prisma } from '@prisma/client';
import { IGetExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';

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
              user_email: 'joaojbs199@gmail.com',
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
      owners: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };

  try {
    const data = await prisma.expense.findMany(query);

    /* const data: any = [
      {
        id: 1,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 62,
        description: 'Conta vivo',
        type: 'INDIVIDUAL',
        paymentBarCode: '1237123197263192378612301782310238741623041872361092387412304',
        observations: 'Teste de observações de despesas',
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 2,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 575.6,
        description: 'Cartão XP',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 3,
        dueDate: '2023-07-05T03:00:00.000Z',
        value: 180,
        description: 'Consórcio moto',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 4,
        dueDate: '2023-07-07T03:00:00.000Z',
        value: 204,
        description: 'Poupança casal',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 5,
        dueDate: '2023-07-10T03:00:00.000Z',
        value: 946.41,
        description: 'Empréstimo Sicoob João',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 7,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 135,
        description: 'Poupança casal',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
        ],
      },
      {
        id: 8,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 365.41,
        description: 'Poupança casal',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 9,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 292.33,
        description: 'FGTS',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 10,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 200,
        description: 'Poupança carteira',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 11,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 400,
        description: 'Troca Swile flex',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 12,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 38,
        description: 'Conta vivo',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 13,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 301.46,
        description: 'Cartão crédito XP',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 14,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 172,
        description: 'Poupança beleza',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 15,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 240.68,
        description: 'Faculdade',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 16,
        dueDate: '2023-07-10T03:00:00.000Z',
        value: 50,
        description: 'Internet roça',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 17,
        dueDate: '2023-07-15T03:00:00.000Z',
        value: 64.03,
        description: 'Empréstimo Sicoob Fernanda',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 18,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 257,
        description: 'Poupança férias',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 19,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 71,
        description: 'DAS',
        type: 'INDIVIDUAL',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 20,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 225,
        description: 'Mônica',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 21,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 14.13,
        description: 'Netflix',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 22,
        dueDate: '2023-07-05T03:00:00.000Z',
        value: 422.56,
        description: 'Prestação casa',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 23,
        dueDate: '2023-07-10T03:00:00.000Z',
        value: 14.6,
        description: 'Manutenção conta caixa',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 24,
        dueDate: '2023-07-01T03:00:00.000Z',
        value: 110,
        description: 'Ração',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: true,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 25,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 180,
        description: 'Academia',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 26,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 27.15,
        description: 'Água',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
      {
        id: 27,
        dueDate: '2023-07-20T03:00:00.000Z',
        value: 59.9,
        description: 'Internet',
        type: 'SHARED',
        paymentBarCode: null,
        observations: null,
        status: false,
        paymentList_id: null,
        owners: [
          {
            id: 1,
            name: 'João',
          },
          {
            id: 2,
            name: 'Fernanda',
          },
        ],
      },
    ]; */

    const response: IGetExpenseApiResponse = {
      metadata: {
        totalResults: data.length,
      },
      data: data,
    };

    return NextResponse.json({ data: response, message: 'FINDED EXPENSES.' }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('DEBUG_OUR-FINANCE <-----> error:', error);

      return NextResponse.json(
        { data: null, message: `Prisma error. Code: ${error.code}` },
        { status: 422 },
      );
    } else {
      return NextResponse.json(
        { data: null, message: 'EXPENSE NOT FINDED, SOMETHING WENT WRONG.' },
        { status: 500 },
      );
    }
  }
}
