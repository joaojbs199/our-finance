import { ExpenseType } from '@prisma/client';

export type TypeOptions = {
  label: string;
  value: ExpenseType;
};

export type OwnerOptions = {
  label: string;
  value: number;
};

export interface FormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: TypeOptions;
  owners: OwnerOptions[];
  value: string;
}
