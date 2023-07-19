import { ExpenseType } from '@prisma/client';
export interface IGetExpensesRequestParams {
  initialDate: Date | '';
  finalDate: Date | '';
  ownerIds?: Array<number>;
  type?: Array<ExpenseType>;
}

export interface ICreateExpenseRequestParams {
  expense: {
    dueDate: Date;
    value: number;
    description: string;
    type: ExpenseType;
    status: boolean;
  };
  ownerId: number;
}
