import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { makeRequestHandlerFactory } from '@/src/integration/domain/factories/services/request-service-factory';
import {
  IGetExpenseApiResponse,
  PartialExpense,
} from '@/src/integration/data/models/apiResponse/expense/interfaces';
import {
  ICreateExpenseRequestParams,
  IDeleteExpenseParams,
  IGetExpensesRequestParams,
  IUpdateExpenseRequestParams,
  IUpdateExpenseStatusRequestParams,
} from '@/src/integration/data/models/requestParams/expense/interfaces';
import { ConfigurationActions } from '@/src/slices/configuration/configurationSlice';
import { delay } from '@/src/utils/Helpers';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';

export const getExpenses = createAsyncThunk<
  IGetExpenseApiResponse,
  IGetExpensesRequestParams,
  { state: RootState; rejectValue: string }
>('expense/getExpenses', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    dispatch(ConfigurationActions.setGlobalIsLoading(true));

    const response = await request.handle<IGetExpenseApiResponse>({
      url: '/api/expenses/getExpenses',
      method: 'post',
      body: requestParams,
    });
    const expenses: IGetExpenseApiResponse = response;

    dispatch(ConfigurationActions.setGlobalIsLoading(false));

    return expenses;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const createExpense = createAsyncThunk<
  void,
  ICreateExpenseRequestParams,
  { state: RootState; rejectValue: string }
>('expense/createExpense', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    await request.handle<void>({
      url: '/api/expenses/createExpense',
      method: 'put',
      body: requestParams,
    });

    dispatch(ExpenseActions.setCreateExpenseIsLoading(false));
    dispatch(ExpenseActions.setCreateExpenseIsDone(true));
    await delay(1000);
    dispatch(ExpenseActions.setCreateExpenseIsDone(false));

    dispatch(ExpenseActions.setIsOpenCreateExpenseDialog(false));

    dispatch(
      getExpenses({
        initialDate: '',
        finalDate: '',
      }),
    );
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const updateExpense = createAsyncThunk<
  PartialExpense,
  IUpdateExpenseRequestParams,
  { state: RootState; rejectValue: string }
>('expense/updateExpense', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    const response = await request.handle<PartialExpense>({
      url: '/api/expenses/updateExpense',
      method: 'put',
      body: requestParams,
    });

    dispatch(ExpenseActions.setUpdateExpenseIsLoading(false));
    dispatch(ExpenseActions.setUpdateExpenseIsDone(true));
    await delay(1000);
    dispatch(ExpenseActions.setUpdateExpenseIsDone(false));

    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const deleteExpense = createAsyncThunk<
  void,
  IDeleteExpenseParams,
  { state: RootState; rejectValue: string }
>('expense/deleteExpense', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    await request.handle<void>({
      url: '/api/expenses/deleteExpense',
      method: 'delete',
      body: requestParams,
    });

    dispatch(ExpenseActions.setDeleteExpenseIsLoading(false));
    dispatch(ExpenseActions.setDeleteExpenseIsDone(true));
    await delay(1000);
    dispatch(ExpenseActions.setDeleteExpenseIsDone(false));

    dispatch(ExpenseActions.setIsOpenDeleteExpenseDialog({ isOpen: false, expenseId: 0 }));

    dispatch(
      getExpenses({
        initialDate: '',
        finalDate: '',
      }),
    );
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const updateExpenseStatus = createAsyncThunk<
  PartialExpense,
  IUpdateExpenseStatusRequestParams,
  { state: RootState; rejectValue: string }
>('expense/updateExpenseStatus', async (requestParams, { rejectWithValue, dispatch }) => {
  try {
    const request = makeRequestHandlerFactory();

    dispatch(ConfigurationActions.setGlobalIsLoading(true));

    const response = await request.handle<PartialExpense>({
      url: '/api/expenses/updateExpenseStatus',
      method: 'put',
      body: requestParams,
    });

    dispatch(ConfigurationActions.setGlobalIsLoading(false));

    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});
