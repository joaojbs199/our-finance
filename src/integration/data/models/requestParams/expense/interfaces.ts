import { ExpenseStatusType, ExpenseType } from '@prisma/client';
import { ISODate } from '@/src/integration/data/models/apiResponse/base/interfaces';

export interface IGetExpensesRequestParams {
  initialDate: ISODate | '';
  finalDate: ISODate | '';
  ownerIds?: Array<number>;
  type?: Array<ExpenseType>;
}

export interface ICreateExpenseRequestParams {
  expense: {
    dueDate: ISODate;
    value: number;
    description: string;
    type: ExpenseType;
    status: ExpenseStatusType;
    ownerId: number;
  };
  ownerId: number;
}
