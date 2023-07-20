import { Expense } from '@prisma/client';

export interface IGetExpenseApiResponse {
  metadata: {
    totalResults: number;
  };
  data: PartialExpense[];
}

export type PartialExpense = Omit<Expense, 'created_at' | 'updated_at'>;
