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

export interface IUpdateExpenseStatusRequestParams {
  id: number;
  status: boolean;
}

export interface IUpdateExpenseRequestParams {
  id: number;
  updates: {
    description?: string;
    dueDate?: string;
    value?: number;
    observations?: string | null;
    paymentBarCode?: string | null;
    type?: ExpenseType;
    owners?: Array<{ id: number }>;
  };
}
