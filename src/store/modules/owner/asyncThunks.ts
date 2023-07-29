import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import { PartialOwner } from '@/src/integration/data/models/apiResponse/owner/interfaces';

export const getOwners = createAsyncThunk<
  PartialOwner[],
  void,
  { state: RootState; rejectValue: string }
>('owner/getOwners', async (_, { rejectWithValue }) => {
  try {
    const request = makeRequestHandlerFactory();

    const response = await request.handle<PartialOwner[]>({
      url: '/api/owners/getOwners',
      method: 'get',
    });
    const owners: PartialOwner[] = response;
    return owners;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});
