import { Owner } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';

export const getOwners = createAsyncThunk<Owner[], void, { state: RootState; rejectValue: string }>(
  'users/getOwners',
  async (_, { rejectWithValue }) => {
    try {
      const request = makeRequestHandlerFactory();

      const response = await request.handle<Owner[]>({
        url: '/api/owner/getOwners',
        method: 'get',
      });
      const owners: Owner[] = response;
      return owners;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  },
);
