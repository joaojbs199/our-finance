import { Expense } from '@prisma/client';

export interface IExpenseApiResponse {
  metadata: {
    totalResults: number;
  };
  data: Expense[];
}
