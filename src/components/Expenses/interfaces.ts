import { OwnerSelectOptions } from '@/src/integration/data/models/flow/owner/interfaces';
import { ExpenseType } from '@prisma/client';

export type ExpenseTypeOptions = {
  label: string;
  value: ExpenseType;
};

export interface CreateExpenseFormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: ExpenseTypeOptions;
  owners: OwnerSelectOptions[];
  value: string;
  status: boolean;
}

export interface UpdateExpenseFormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: ExpenseTypeOptions;
  owners: OwnerSelectOptions[];
  value: string;
}
