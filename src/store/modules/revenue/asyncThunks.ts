import { IGetRevenueApiResponse } from '@/src/integration/data/models/apiResponse/revenues/interfaces';
import { IGetRevenuesRequestParams } from '@/src/integration/data/models/requestParams/revenue/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import { ConfigurationActions } from '@/src/slices/configuration/configurationSlice';

export const getRevenues = createAsyncThunk<
  IGetRevenueApiResponse,
  IGetRevenuesRequestParams,
  { state: RootState; rejectValue: string }
>('expense/getExpenses', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    dispatch(ConfigurationActions.setGlobalIsLoading(true));

    const response = await request.handle<IGetRevenueApiResponse>({
      url: '/api/expenses/getExpenses',
      method: 'post',
      body: requestParams,
    });
    const expenses: IGetRevenueApiResponse = response;

    dispatch(ConfigurationActions.setGlobalIsLoading(false));

    return expenses;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});
