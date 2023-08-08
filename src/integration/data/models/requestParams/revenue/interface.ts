import { RevenueType } from '@prisma/client';

export interface IGetRevenuesRequestParams {
  initialDate: Date | '';
  finalDate: Date | '';
  ownerId?: number;
  type?: Array<RevenueType>;
}
