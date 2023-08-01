import { Expense, Prisma } from '@prisma/client';
import { IMetadata } from '@/src/integration/data/models/apiResponse/base/interfaces';

export interface IGetExpenseApiResponse {
  metadata: IMetadata;
  data: PartialExpense[];
}

export type PartialExpense = Omit<Expense, 'created_at' | 'updated_at'> &
  Prisma.ExpenseGetPayload<{
    select: {
      owners: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;
