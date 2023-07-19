import { Expense } from '@prisma/client';

export interface IGetExpenseApiResponse {
  metadata: {
    totalResults: number;
  };
  data: Omit<Expense, 'created_at' | 'updated_at'>[];
}
