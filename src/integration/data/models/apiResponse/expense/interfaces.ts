import { Expense } from '@prisma/client';

export interface IGetExpenseApiResponse {
  metadata: {
    totalResults: number;
  };
  data: Expense[];
}
