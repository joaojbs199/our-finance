import { ExpenseType } from '@prisma/client';
export interface IGetExpensesRequestParams {
  /**
   * string date in yyyy-mm-dd format
   */
  initialDate: string;
  /**
   * string date in yyyy-mm-dd format
   */
  finalDate: string;
  ownerIds?: Array<number>;
  type?: Array<ExpenseType>;
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

export interface ICreateExpenseRequestParams {
  description: string;
  dueDate: string;
  value: number;
  observations: string | null;
  paymentBarCode: string | null;
  type: ExpenseType;
  owners: Array<{ id: number }>;
  status: boolean;
}

export interface IDeleteExpenseParams {
  id: number;
}
