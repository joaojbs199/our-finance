import { createSlice } from '@reduxjs/toolkit';
import { initialExpenseState } from '@/src/store/state';
import {
  createExpense,
  getExpenses,
  updateExpenseStatus,
} from '@/src/store/modules/expense/asyncThunks';
import { updateExpenses } from './reducer-helper';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.uiState.getExpenses.isLoading = true;
        state.uiState.getExpenses.error = { isError: false, errorMessage: '' };
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.uiState.getExpenses.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.uiState.getExpenses.isLoading = false;
        state.uiState.getExpenses.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(createExpense.pending, (state) => {
        state.uiState.createExpense.isLoading = true;
        state.uiState.createExpense.error = { isError: false, errorMessage: '' };
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.uiState.createExpense.isLoading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.uiState.createExpense.isLoading = false;
        state.uiState.createExpense.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(updateExpenseStatus.pending, (state) => {
        state.uiState.updateExpenseStatus.isLoading = true;
        state.uiState.updateExpenseStatus.error = { isError: false, errorMessage: '' };
      })
      .addCase(updateExpenseStatus.fulfilled, (state, action) => {
        const updatedExpenses = updateExpenses(action.payload, state.expenses.data);
        state.expenses.data = updatedExpenses;
        state.uiState.updateExpenseStatus.isLoading = false;
      })
      .addCase(updateExpenseStatus.rejected, (state, action) => {
        state.uiState.updateExpenseStatus.isLoading = false;
        state.uiState.updateExpenseStatus.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });
  },
});

export default expenseSlice;
