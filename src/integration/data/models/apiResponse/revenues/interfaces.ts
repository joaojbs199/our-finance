import { Prisma, Revenue } from '@prisma/client';
import { IMetadata } from '@/src/integration/data/models/apiResponse/base/interfaces';

export interface IGetRevenueApiResponse {
  metadata: IMetadata;
  data: PartialRevenue[];
}

export type PartialRevenue = Omit<Revenue, 'created_at' | 'updated_at' | 'owner_id'> &
  Prisma.RevenueGetPayload<{
    select: {
      owner: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;
