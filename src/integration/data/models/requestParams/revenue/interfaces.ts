import { RevenueType } from '@prisma/client';

export interface IGetRevenuesRequestParams {
  /**
   * string date in yyyy-mm-dd format
   */
  initialDate: string;
  /**
   * string date in yyyy-mm-dd format
   */
  finalDate: string;
  ownerId?: number;
  type?: Array<RevenueType>;
}

export interface IUpdateRevenueRequestParams {
  id: number;
  updates: {
    description?: string;
    date?: string;
    value?: number;
    type?: RevenueType;
    owner?: number;
  };
}
