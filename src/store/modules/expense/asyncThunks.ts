import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import { IGetExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import {
  ICreateExpenseRequestParams,
  IGetExpensesRequestParams,
} from '@/src/integration/data/models/requestParams/expense/interfaces';

export const getExpenses = createAsyncThunk<
  IGetExpenseApiResponse,
  IGetExpensesRequestParams,
  { state: RootState; rejectValue: string }
>('expense/getExpenses', async (requestParams, { rejectWithValue }) => {
  try {
    const request = makeRequestHandlerFactory();

    const response = await request.handle<IGetExpenseApiResponse>({
      url: '/api/expenses/getExpenses',
      method: 'post',
      body: requestParams,
    });
    const expenses: IGetExpenseApiResponse = response;
    return expenses;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const createExpense = createAsyncThunk<
  boolean,
  ICreateExpenseRequestParams,
  { state: RootState; rejectValue: string }
>('expense/createExpense', async (requestParams, { rejectWithValue }) => {
  try {
    const request = makeRequestHandlerFactory();

    const response = await request.handle<boolean>({
      url: '/api/expenses/createExpense',
      method: 'put',
      body: requestParams,
    });
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});
