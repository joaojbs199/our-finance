import { OwnerSelectOptions } from '@/src/integration/data/models/flow/owner/interfaces';
import { RevenueType } from '@prisma/client';

export type RevenueTypeOptions = {
  label: string;
  value: RevenueType;
};

export interface UpdateRevenueFormValues {
  description: string;
  date: string;
  value: string;
  type: RevenueTypeOptions;
  owner: OwnerSelectOptions;
}
