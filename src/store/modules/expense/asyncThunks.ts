import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import { IExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import { IGetExpensesRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';

export const getExpenses = createAsyncThunk<
  IExpenseApiResponse,
  IGetExpensesRequestParams,
  { state: RootState; rejectValue: string }
>('expense/getExpenses', async (requestParams, { rejectWithValue }) => {
  try {
    const request = makeRequestHandlerFactory();

    const response = await request.handle<IExpenseApiResponse>({
      url: '/api/expense/getExpenses',
      method: 'post',
      body: requestParams,
    });
    const expenses: IExpenseApiResponse = response;
    return expenses;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});
