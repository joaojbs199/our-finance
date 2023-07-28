import { ExpenseType } from '@prisma/client';

type SelectOption = {
  label: string;
  value: ExpenseType;
};

export interface FormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: SelectOption;
  value: string;
}
